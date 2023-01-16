import { functions } from "../../firebase"
import { httpsCallable } from "firebase/functions"
import { Role } from "../../auth"

export type ProfileMember = {
  district: string
  id: string
  name: string
}

export const SOCIAL_NETWORKS = ["linkedIn", "twitter"] as const

export type SocialLinks = Partial<
  Record<typeof SOCIAL_NETWORKS[number], string>
>

export type Profile = {
  role?: Role
  displayName?: string
  fullName?: string
  representative?: ProfileMember
  senator?: ProfileMember
  public?: boolean
  about?: string
  social?: SocialLinks
  organization?: boolean
  profileImage?: string
}

export const requestUpgrade = httpsCallable<
  { id: string },
  { requestId: string }
>(functions, "requestUpgrade")
