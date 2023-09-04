import * as React from "react";
import { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";
import {
  RectButton as NativeRectButton,
  RectButtonProps,
} from "react-native-gesture-handler";
import { useStyle } from "../../styles";

/**
 * RectButton replaces the "RectButton" of "react-native-gesture-handler".
 * "react-native-gesture-handler"'s rect button seems to have the bugs that the ripple color is not provided
 * and border radius is used directly to the rect button component.
 * To solve this problem, set the default ripple color if it is not provided
 * and wrap it with the View and set the border radius to that View if border radius style is provided.
 * @param props
 * @constructor
 */
export const RectButton: FunctionComponent<
  RectButtonProps & {
    style?: ViewStyle;
    children: any;
  }
> = (props) => {
  const style = useStyle();

  const {
    children,
    style: propStyle,
    rippleColor,
    underlayColor,
    activeOpacity,
    ...rest
  } = props;

  const {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomColor,
    borderBottomWidth,
    borderLeftColor,
    borderLeftWidth,
    borderRightColor,
    borderRightWidth,
    borderTopColor,
    borderTopWidth,
    borderColor,
    borderWidth,
    borderStyle,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    flexGrow,
    flex,
    flexBasis,
    flexShrink,
    flexWrap,
    backgroundColor,
    ...restStyle
  } = (propStyle as { [key: string]: any }) ?? {};
  return (
    <View
      style={{
        overflow: "hidden",
        flex: flex,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderBottomColor,
        borderBottomWidth,
        borderLeftColor,
        borderLeftWidth,
        borderRightColor,
        borderRightWidth,
        borderTopColor,
        borderTopWidth,
        borderColor,
        borderWidth,
        borderStyle,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        flexGrow,
        flexBasis,
        flexShrink,
        flexWrap,
        backgroundColor,
      }}
    >
      <NativeRectButton
        style={restStyle}
        rippleColor={
          rippleColor || style.get("color-rect-button-default-ripple").color
        }
        underlayColor={
          underlayColor || style.get("color-rect-button-default-underlay").color
        }
        activeOpacity={activeOpacity ?? 0.2}
        {...rest}
      >
        {children}
      </NativeRectButton>
    </View>
  );
};
