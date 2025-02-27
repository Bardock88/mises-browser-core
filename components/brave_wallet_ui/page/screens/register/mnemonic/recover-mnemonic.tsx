import * as React from "react";
import { FunctionComponent, useState } from "react";
import { PageWithScrollView } from "../../../components/page";
import { useStyle } from "../../../styles";
import { useSmartNavigation } from "../../../navigation";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../../components/input";
import { StyleSheet, View } from "react-native";
import { Button } from "../../../components/button";
import Clipboard from "@react-native-clipboard/clipboard";
import { WalletPageActions } from "../../../../page/actions";
import { useDispatch } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bip39 = require("bip39");

function trimWordsStr(str: string): string {
  str = str.trim();
  // Split on the whitespace or new line.
  const splited = str.split(/\s+/);
  const words = splited
    .map((word) => word.trim())
    .filter((word) => word.trim().length > 0);
  return words.join(" ");
}

interface FormData {
  mnemonic: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const RecoverMnemonicScreen: FunctionComponent = () => {
  // const route = useRoute<
  //   RouteProp<
  //     Record<
  //       string,
  //       {
  //         registerConfig: any;
  //       }
  //     >,
  //     string
  //   >
  // >();

  const style = useStyle();

  const smartNavigation = useSmartNavigation();

  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch();

  const [isCreating, setIsCreating] = useState(false);

  const submit = handleSubmit(async () => {
    setIsCreating(true);

    const mnemonic = trimWordsStr(getValues("mnemonic"));
    console.log(mnemonic)
    await dispatch(WalletPageActions.restoreWallet({
      // added an additional trim here in case the phrase length is
      // 12, 15, 18 or 21 long and has a space at the end.
      mnemonic,
      password: getValues("password"),
      isLegacy: false,
      completeWalletSetup: false // postpone until wallet onboarding success screen
    }))
    // await registerConfig.createMnemonic(
    //   getValues("name"),
    //   mnemonic,
    //   getValues("password"),
    //   bip44Option.bip44HDPath
    // );
    // analyticsStore.setUserProperties({
    //   registerType: "seed",
    //   accountType: "mnemonic",
    // });

    smartNavigation.reset({
      index: 0,
      routes: [
        {
          name: "Register.End",
          params: {
            password: getValues("password"),
          },
          key: "Register.End",
        },
      ],
      key: "Register.End",
      type: "reset",
      stale: false,
      routeNames: ["Register.End"],
    });
  });

  return (
    <PageWithScrollView
      backgroundMode="tertiary"
      contentContainerStyle={style.get("flex-grow-1")}
      style={style.flatten(["padding-x-page"])}
    >
      <Controller
        control={control}
        rules={{
          required: "Mnemonic is required",
          validate: (value: string) => {
            value = trimWordsStr(value);
            if (value.split(" ").length < 8) {
              return "Too short mnemonic";
            }

            if (!bip39.validateMnemonic(value)) {
              return "Invalid mnemonic";
            }
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <TextInput
              label="Mnemonic seed"
              returnKeyType="next"
              multiline={true}
              numberOfLines={4}
              inputContainerStyle={style.flatten([
                "padding-x-20",
                "padding-y-16",
              ])}
              bottomInInputContainer={
                <View style={style.flatten(["flex-row"])}>
                  <View style={style.flatten(["flex-1"])} />
                  <Button
                    containerStyle={style.flatten(["height-36"])}
                    style={style.flatten(["padding-x-12"])}
                    mode="text"
                    text="Paste"
                    onPress={async () => {
                      const text = await Clipboard.getString();
                      if (text) {
                        setValue("mnemonic", text, {
                          shouldValidate: true,
                        });

                        setFocus("name");
                      }
                    }}
                  />
                </View>
              }
              style={StyleSheet.flatten([
                style.flatten(["h6", "color-text-middle"]),
                {
                  minHeight: 20 * 4,
                  textAlignVertical: "top",
                },
              ])}
              onSubmitEditing={() => {
                setFocus("name");
              }}
              error={errors.mnemonic?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              ref={ref}
            />
          );
        }}
        name="mnemonic"
        defaultValue=""
      />
      {/* <Controller
        control={control}
        rules={{
          required: "Name is required",
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <TextInput
              label="Wallet nickname"
              containerStyle={style.flatten(["padding-bottom-6"])}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                setFocus("password");
              }}
              error={errors.name?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              ref={ref}
            />
          );
        }}
        name="name"
        defaultValue=""
      /> */}
      {/* <BIP44AdvancedButton bip44Option={bip44Option} /> */}
      <React.Fragment>
        <Controller
          control={control}
          rules={{
            required: "Password is required",
            validate: (value: string) => {
              if (value.length < 8) {
                return "Password must be longer than 8 characters";
              }
              return true;
            },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <TextInput
                label="Password"
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() => {
                  setFocus("confirmPassword");
                }}
                error={errors.password?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                ref={ref}
              />
            );
          }}
          name="password"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{
            required: "Confirm password is required",
            validate: (value: string) => {
              if (value.length < 8) {
                return "Password must be longer than 8 characters";
              }

              if (getValues("password") !== value) {
                return "Password doesn't match";
              }
              return true;
            },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <TextInput
                label="Confirm password"
                returnKeyType="done"
                secureTextEntry={true}
                onSubmitEditing={() => {
                  submit();
                }}
                error={errors.confirmPassword?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                ref={ref}
              />
            );
          }}
          name="confirmPassword"
          defaultValue=""
        />
      </React.Fragment>
      <View style={style.flatten(["flex-1"])} />
      <Button text="Next" size="large" loading={isCreating} onPress={submit} />
      {/* Mock element for bottom padding */}
      <View style={style.flatten(["height-page-pad"])} />
    </PageWithScrollView>
  );
};
