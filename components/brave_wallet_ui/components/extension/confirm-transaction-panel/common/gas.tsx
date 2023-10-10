// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'
import { useSelector } from 'react-redux'

// hooks

// components
import EditGas, { MaxPriorityPanels } from '../../edit-gas/edit-gas'

// selectors
import { WalletSelectors } from '../../../../common/selectors'

interface Props {
  onCancel: () => void,
  suggestedMaxPriorityFeeChoices: any,
  updateUnapprovedTransactionGasFields: any,
  baseFeePerGas: any,
  findAssetPrice: any,
  transactionsNetwork: any
}

export function EditPendingTransactionGas (props: Props) {
  const { 
    onCancel,
    suggestedMaxPriorityFeeChoices,
    updateUnapprovedTransactionGasFields,
    baseFeePerGas,
    findAssetPrice,
    transactionsNetwork
  } = props

  // redux
  const transactionInfo = useSelector(
    WalletSelectors.selectedPendingTransaction
  )

  const [suggestedSliderStep, setSuggestedSliderStep] = React.useState<string>('1')
  const [maxPriorityPanel, setMaxPriorityPanel] = React.useState<MaxPriorityPanels>(
    MaxPriorityPanels.setCustom
  )

  if (!transactionInfo || !transactionsNetwork) {
    return null
  }

  return (
    <EditGas
      transactionInfo={transactionInfo}
      onCancel={onCancel}
      networkSpotPrice={findAssetPrice(transactionsNetwork.symbol, '', transactionsNetwork.chainId)}
      selectedNetwork={transactionsNetwork}
      baseFeePerGas={baseFeePerGas}
      suggestedMaxPriorityFeeChoices={suggestedMaxPriorityFeeChoices}
      updateUnapprovedTransactionGasFields={updateUnapprovedTransactionGasFields}
      suggestedSliderStep={suggestedSliderStep}
      setSuggestedSliderStep={setSuggestedSliderStep}
      maxPriorityPanel={maxPriorityPanel}
      setMaxPriorityPanel={setMaxPriorityPanel}
    />
  )
}
