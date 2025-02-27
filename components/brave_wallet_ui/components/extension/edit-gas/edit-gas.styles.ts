// Copyright (c) 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import styled from 'styled-components/native'
import { LeoColors } from '../../leo/alert-inline/leo-colors'

export const StyledWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 87%;
  padding: 5px 15px 15px 15px;
  overflow-y: auto;
`

export const FormColumn = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-self: center;
`

export const InputLabel = styled.Text`
  font-family: Poppins;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${(p) => p.theme.color.text02};
  margin-bottom: 6px;
`

export const Input = styled.TextInput<{
  hasError?: boolean
}>`
  box-sizing: border-box;
  width: 100%;
  background-image: none;
  background-color: ${(p) => p.theme.color.background02};
  border-style: solid;
  border-width: 1px;
  border-color: ${(p) =>
    p.hasError
      ? LeoColors['light.system.feedback.error.icon']
      : p.theme.color.interactive08};
  border-radius: 4px;
  font-family: Poppins;
  font-style: normal;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.01em;
  padding: 10px;
  margin-bottom: 8px;
  color: ${(p) => p.theme.color.text01};
  ::placeholder {
    font-family: Poppins;
    font-style: normal;
    font-size: 12px;
    letter-spacing: 0.01em;
    color: ${(p) => p.theme.color.text03};
    font-weight: normal;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (prefers-color-scheme: dark) {
    border-color: ${(p) =>
      p.hasError
        ? LeoColors['light.system.feedback.error.icon']
        : p.theme.color.interactive08};
  }
`

export const ButtonRow = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap-reverse;
`

export const Description = styled.Text`
  width: 275px;
  font-family: Poppins;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-align: flex-start;
  color: ${(p) => p.theme.color.text02};
`

export const CurrentBaseText = styled.Text`
  font-family: Poppins;
  font-size: 12px;
  line-height: 18px;
  color: ${(p) => p.theme.color.text01};
  margin-bottom: 10px;
`

export const CurrentBaseRow = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  border-bottom: ${(p) => `1px solid ${p.theme.color.divider01}`};
  margin-bottom: 12px;
`

export const MaximumFeeText = styled.Text`
  font-family: Poppins;
  font-size: 12px;
  line-height: 18px;
  color: ${(p) => p.theme.color.text01};
  letter-spacing: 0.01em;
`

export const MaximumFeeRow = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`

export const SliderWrapper = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`

export const SliderValue = styled.Text`
  font-family: Poppins;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: ${(p) => p.theme.color.text01};
  letter-spacing: 0.01em;
  margin-top: 6px;
  margin-bottom: 16px;
`

// export const GasSlider = styled.input`
//   background-image: none;
//   background-color: none;;
//   overflow: hidden;
//   display: block;
//   appearance: none;
//   width: 100%;
//   margin: 0;
//   margin-bottom: 10px;
//   height: 24px;
//   cursor: pointer;
//   &::-webkit-slider-runnable-track {
//     width: 100%;
//     height: 5px;
//     background-color: ${(p) => p.theme.color.interactive05};
//     border-radius: 10px;
//   }
//   &::-webkit-slider-thumb {
//     position: relative;
//     appearance: none;
//     height: 24px;
//     width: 24px;
//     background-color: ${(p) => p.theme.color.background01};
//     border-radius: 100%;
//     border: ${(p) => `1px solid ${p.theme.color.interactive08}`};
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   &::-webkit-progress-value {
//     background-color: orange;
//     width: 100%;
//     height: 5px;
//   }
//   &:hover,
//   &:focus {
//     &::-webkit-slider-thumb {
//       background-color: ${(p) => p.theme.color.background01};
//     }
//   }
// `

export const SliderLabelRow = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`

export const SliderLabel = styled.Text`
  font-family: Poppins;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.color.text02};
  letter-spacing: 0.01em;
`

export const WarningText = styled.Text`
  font-family: Poppins;
  letter-spacing: 0.01em;
  font-size: 12px;
  color: ${(p) => p.theme.color.errorText};
  word-break: break-word;
  margin-bottom: 12px;
`
