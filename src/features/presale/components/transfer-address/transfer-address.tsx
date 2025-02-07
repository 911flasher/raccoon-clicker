/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react'

import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

export const TransferAddress: FC = () => {
  const { t } = useTranslation()

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      toast.success(t('Address is copied'))
    } catch (err) {
      toast.error(t('Something went wrong'))
    }
  }

  return (
    <div className={styles.container}>
      <Text textStyle='h3' className={styles.title}>
        {t('Transfer to the address')}
      </Text>

      <div className={styles.addressContainer}>
        <Text className={styles.address} textStyle='number'>
          0xbA07f5a60B408A1349bC57Fc5d77DE62A9db735b
        </Text>
        <button
          type='button'
          className={styles.copyImg}
          onClick={() => copyToClipboard('0xbA07f5a60B408A1349bC57Fc5d77DE62A9db735b')}
        >
          <img className='w-[22px] h-[22px] cursor-pointer' src='/images/presale/copy.svg' alt='copy address' draggable={false}/>
        </button>
      </div>

      <ol className={styles.list}>
        <li className={styles.listItem}>
          <Text>{t('Send any amount from $5 to the specified wallet address.')}</Text>
        </li>
        <li className={styles.listItem}>
          <Text>{t('List of supported assets')}</Text>
        </li>
      </ol>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ethereum</th>
            <th>Arbitrum</th>
            <th>BSC</th>
            <th>Polygon</th>
            <th>Avalanche</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>ETH</td>
            <td>ETH</td>
            <td>BNB</td>
            <td>MATIC</td>
            <td>AVAX</td>
          </tr>
          <tr>
            <td>USDT</td>
            <td>USDT</td>
            <td>USDT</td>
            <td>USDT</td>
            <td>USDT</td>
          </tr>
          <tr>
            <td>USDC</td>
            <td>USDC</td>
            <td>USDC</td>
            <td>USDC</td>
            <td>USDC</td>
          </tr>
          <tr>
            <td className={styles.withDiscount}>
              <span>PEPE</span>
              <img alt='discount' src='/images/presale/discount.svg' width={13} height={13} draggable={false}/>
            </td>
            <td>ARB</td>
            <td className={styles.withDiscount}>
              <span>DOGE</span>
              <img alt='discount' src='/images/presale/discount.svg' draggable={false} width={13} height={13} />
            </td>
            <td>WBTC</td>
            <td />
            <td />
          </tr>
          <tr>
            <td className={styles.withDiscount}>
              <span>SHIB</span>
              <img alt='discount' src='/images/presale/discount.svg' draggable={false} width={13} height={13} />
            </td>
            <td>WBTC</td>
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td className={styles.withDiscount}>
              <span>FLOKI</span>
              <img alt='discount' src='/images/presale/discount.svg' draggable={false} width={13} height={13} />
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td className={styles.withDiscount}>
              <span>MEME</span>
              <img alt='discount' src='/images/presale/discount.svg' draggable={false} width={13} height={13} />
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>WBTC</td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>

      <Text>{t('Send funds only from decentralized wallets, do not use exchanges for this')}</Text>
    </div>
  )
}
