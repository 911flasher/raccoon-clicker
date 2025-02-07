import type { FC } from 'react'

import { FriendsList, ReferralLink } from 'features/friends'
import { SectionHeader } from 'features/page-layout'

export const FriendsPage: FC = () => (
  <>
    <SectionHeader name='friends' />
    <ReferralLink />
    <FriendsList />
  </>
)
