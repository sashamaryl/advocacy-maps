import { firestore } from "components/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { loremIpsum, LoremIpsum } from "lorem-ipsum"
import { DateTime } from "luxon"
import type { Flag, FlagMessage } from "./types"

export const gptFlags = [
  {
    id: "flag_001",
    flagTime: "2022-01-01T12:00:00Z",
    testimonyId: "testimony_001",
    testimonyText: "This is a testimony.",
    userId: "user_001",
    userReason: "I think this is inappropriate.",
    moderatorId: "moderator_001",
    moderatorComment: "I agree, this violates our community guidelines.",
    moderationDate: "2022-01-02T12:00:00Z",
    messages: [
      {
        id: "message_001",
        text: "Please provide more information about why you flagged this testimony.",
        senderId: "moderator_001",
        sentTime: "2022-01-02T12:30:00Z"
      },
      {
        id: "message_002",
        text: "I flagged this because it contains inappropriate content.",
        senderId: "user_001",
        sentTime: "2022-01-02T13:00:00Z"
      }
    ]
  },
  {
    id: "flag_002",
    flagTime: "2022-02-01T12:00:00Z",
    testimonyId: "testimony_002",
    testimonyText: "This is another testimony.",
    userId: "user_002",
    moderatorId: "moderator_002",
    moderationDate: "2022-02-02T12:00:00Z",
    messages: [
      {
        id: "message_003",
        text: "Can you provide more information about why you flagged this testimony?",
        senderId: "moderator_002",
        sentTime: "2022-02-02T12:30:00Z"
      },
      {
        id: "message_004",
        text: "I flagged this because it is spam.",
        senderId: "user_002",
        sentTime: "2022-02-02T13:00:00Z"
      }
    ]
  },
  {
    id: "flag_003",
    flagTime: "2022-03-01T12:00:00Z",
    testimonyId: "testimony_003",
    testimonyText: "This is a testimony.",
    userId: "user_003",
    moderatorId: "moderator_003",
    moderationDate: "2022-03-02T12:00:00Z",
    messages: [
      {
        id: "message_005",
        text: "Can you provide more information about why you flagged this testimony?",
        senderId: "moderator_003",
        sentTime: "2022-03-02T12:30:00Z"
      },
      {
        id: "message_006",
        text: "I flagged this because it is offensive.",
        senderId: "user_003",
        sentTime: "2022-03-02T13:00:00Z"
      },
      {
        id: "message_007",
        text: "Thank you for flagging this. We have removed the testimony.",
        senderId: "moderator_003",
        sentTime: "2022-03-03T12:00:00Z"
      }
    ]
  },
  {
    id: "flag_2",
    flagTime: "2022-01-03T14:00:00Z",
    testimonyId: "testimony_2",
    testimonyText:
      "I saw the incident from my office window on the 12th floor. The perpetrator appeared to be a tall, slim man with dark hair and was wearing a black hoodie and blue jeans. He was carrying a backpack and a red sports bag, which appeared to be quite heavy. I saw him run towards the nearby subway station after the incident.",
    userId: "user_1",
    moderatorId: "moderator_1",
    moderationDate: "2022-01-03T14:30:00Z",
    messages: []
  },
  {
    id: "flag_3",
    flagTime: "2022-01-06T10:00:00Z",
    testimonyId: "testimony_3",
    testimonyText:
      "I was walking my dog when I saw the incident occur. The perpetrator was wearing a red baseball cap and appeared to be in his late 20s or early 30s. He was carrying a large black bag over his shoulder and a small package under his arm. He ran towards the nearby park after the incident.",
    userId: "user_2",
    moderatorId: "moderator_2",
    moderationDate: "2022-01-06T10:30:00Z",
    messages: []
  },
  {
    id: "flag_4",
    flagTime: "2022-01-07T16:00:00Z",
    testimonyId: "testimony_4",
    testimonyText:
      "I was driving past the scene of the incident when it occurred. The perpetrator was a tall man with a beard, wearing a gray sweatshirt and jeans. He was carrying a duffel bag and a backpack. He appeared to be in his late 30s or early 40s and had a distinctive tattoo on his left forearm. I did not see which direction he went after the incident.",
    userId: "user_3",
    moderatorId: "moderator_3",
    moderationDate: "2022-01-07T16:30:00Z",
    messages: []
  },
  {
    id: "flag_5",
    flagTime: "2022-01-10T09:00:00Z",
    testimonyId: "testimony_5",
    testimonyText:
      "I was on my way to work when I saw the incident occur. The perpetrator was wearing a blue coat and carrying a green backpack. He appeared to be in his early 20s and had a distinctive scar on his right cheek. He ran towards the nearby shopping mall after the incident.",
    userId: "user_4",
    moderatorId: "moderator_1",
    moderationDate: "2022-01-10T09:30:00Z",
    messages: []
  },
  {
    id: "flag_6",
    flagTime: "2022-01-11T13:00:00Z",
    testimonyId: "testimony_6",
    testimonyText:
      "I witnessed the incident from my apartment window. The perpetrator was a short, muscular man with a shaved head and a goatee. He was wearing a gray tank top and black shorts. He was carrying a large black duffel bag and a smaller bag over his shoulder. I saw him run towards the nearby parking garage after the incident.",
    userId: "user_2",
    moderatorId: "moderator_2",
    moderationDate: "2022-01-10T09:30:00Z",
    messages: []
  },
  {
    id: "flag_17",
    flagTime: "2022-01-10T09:30:00Z",
    testimonyId: "testimony_17",
    testimonyText:
      "I saw a man in a black hoodie steal a woman's purse outside of the convenience store on Main Street at around 3 PM today.",
    userId: "user_3",
    userReason:
      "I believe this was a clear act of theft and it's important that law enforcement is made aware of this.",
    moderatorId: "mod_2",
    moderatorComment:
      "Thank you for bringing this to our attention. We will forward this to the relevant authorities for investigation.",
    moderationDate: "2022-01-10T09:30:00Z",
    messages: [
      {
        messageId: "msg_23",
        messageText:
          "Thank you for your testimony. We appreciate your help in making our community a safer place.",
        messageTime: "2022-01-10T09:30:00Z",
        userId: "user_4",
        userType: "admin"
      },
      {
        messageId: "msg_24",
        messageText:
          "I completely agree with your assessment. Thank you for taking the time to report this.",
        messageTime: "2022-01-10T09:30:00Z",
        userId: "user_5",
        userType: "moderator"
      }
    ]
  },
  {
    id: "flag_18",
    flagTime: "2022-01-10T09:30:00Z",
    testimonyId: "testimony_18",
    testimonyText:
      "I heard loud shouting and arguing coming from my neighbor's house late last night, and it sounded like it was getting violent. I'm worried for their safety and want to make sure someone checks in on them.",
    userId: "user_4",
    userReason:
      "I'm concerned that someone may be getting hurt, and I believe it's important to intervene and make sure they're okay.",
    moderatorId: "mod_1",
    moderatorComment:
      "We understand your concerns and take these reports very seriously. We will contact the relevant authorities and have them look into this matter.",
    moderationDate: "2022-01-10T09:30:00Z",
    messages: [
      {
        messageId: "msg_25",
        messageText:
          "Thank you for your report. We're taking steps to ensure the safety of your neighbor.",
        messageTime: "2022-01-10T09:30:00Z",
        userId: "user_1",
        userType: "admin"
      }
    ]
  },
  {
    id: "flag_19",
    flagTime: "2022-01-10T09:30:00Z",
    testimonyId: "testimony_19",
    testimonyText:
      "I think someone is vandalizing my car. I found scratches and marks all over it this morning and I'm worried this may happen again.",
    userId: "user_5",
    userReason:
      "I believe this may be a deliberate act of vandalism, and I'm concerned for the safety of my property as well as those around me.",
    moderatorId: "mod_2",
    moderatorComment:
      "We're sorry to hear about this. We recommend you file a report with the local authorities as soon as possible.",
    moderationDate: "2022-01-10T09:30:00Z",
    messages: [
      {
        messageId: "msg_26",
        messageText:
          "We understand how distressing this can be. Please let us know if there's anything else we can do to assist you."
      }
    ]
  }
]

export const gptFlags2 = [
  {
    id: "1",
    flagTime: "2023-02-17T10:30:00.000Z",
    testimonyId: "1234",
    testimonyText: "This post contains hate speech.",
    userId: "user123",
    userReason: "I was offended by the language used in the post.",
    moderatorId: "moderator456",
    status: "resolved",
    moderatorComment: "Post removed due to violation of community guidelines.",
    moderationDate: "2023-02-18T11:15:00.000Z",
    removed: true,
    removedDate: "2023-02-18T11:15:00.000Z",
    resolved: true,
    resolvedDate: "2023-02-18T11:15:00.000Z",
    messages: [
      {
        messageId: "1",
        flagId: "1",
        authorId: "user123",
        recipient: "moderator456",
        messageDate: "2023-02-17T10:30:00.000Z"
      },
      {
        messageId: "2",
        flagId: "1",
        authorId: "moderator456",
        recipient: "user123",
        messageDate: "2023-02-18T11:15:00.000Z"
      }
    ]
  },
  {
    id: "2",
    flagTime: "2023-02-16T09:45:00.000Z",
    testimonyId: "5678",
    testimonyText: "This comment is spam.",
    userId: "user456",
    userReason: "The comment is irrelevant to the discussion.",
    moderatorId: "moderator789",
    status: "inProcess",
    moderatorComment: "",
    moderationDate: "2023-02-17T12:30:00.000Z",
    removed: false,
    removedDate: "",
    resolved: false,
    resolvedDate: "",
    messages: [
      {
        messageId: "3",
        flagId: "2",
        authorId: "user456",
        recipient: "moderator789",
        messageDate: "2023-02-16T09:45:00.000Z"
      },
      {
        messageId: "4",
        flagId: "2",
        authorId: "moderator789",
        recipient: "user456",
        messageDate: "2023-02-17T12:30:00.000Z"
      }
    ]
  },
  {
    id: "3",
    flagTime: "2023-02-15T14:20:00.000Z",
    testimonyId: "9012",
    testimonyText: "This post contains inappropriate content.",
    userId: "user789",
    userReason: "The post contains images that are not suitable for all ages.",
    moderatorId: "",
    status: "unread",
    moderatorComment: "",
    moderationDate: "",
    removed: false,
    removedDate: "",
    resolved: false,
    resolvedDate: "",
    messages: [
      {
        messageId: "5",
        flagId: "3",
        authorId: "user789",
        recipient: "",
        messageDate: "2023-02-15T14:20:00.000Z"
      }
    ]
  },
  {
    id: "4",
    flagTime: "2023-02-14T08:00:00.000Z",
    testimonyId: "123",
    testimonyText: "This testimony is inappropriate and offensive",
    userId: "user1",
    userReason: "I find it offensive",
    moderatorId: "moderator1",
    status: "resolved",
    moderatorComment: "The testimony violated community guidelines",
    moderationDate: "2022-08-02T12:30:00",
    removed: true,
    removedDate: "2022-08-02T13:00:00",
    resolved: true,
    resolvedDate: "2022-08-02T13:00:00",
    messages: [
      {
        messageId: "1",
        flagId: "1",
        authorId: "user1",
        recipient: "moderator1",
        messageDate: "2022-08-01T10:35:00"
      },
      {
        messageId: "2",
        flagId: "1",
        authorId: "moderator1",
        messageDate: "2022-08-02T12:30:00"
      }
    ]
  },
  {
    id: "5",
    flagTime: "2022-09-01T09:30:00",
    testimonyId: "456",
    testimonyText: "This testimony is a duplicate",
    userId: "user2",
    userReason: "I already reported this testimony",
    moderatorId: "moderator2",
    status: "inProcess",
    moderationDate: "2022-09-01T10:00:00",
    removed: false,
    resolved: false,
    messages: [
      {
        messageId: "1",
        flagId: "2",
        authorId: "user2",
        recipient: "moderator2",
        messageDate: "2022-09-01T09:35:00"
      },
      {
        messageId: "2",
        flagId: "2",
        authorId: "moderator2",
        messageDate: "2022-09-01T10:00:00"
      }
    ]
  }
]

const lI = new LoremIpsum()
const idNum = () => Math.round(Math.random() * 999)

class FlagItem {
  static counter: number = 1
  messageIdCounter: number = 1
  userId: string = lI.generateWords(1) + idNum()
  moderatorId: string = ""
  messagesRequested: number = 2

  constructor(moderatorId: string) {
    this.moderatorId = moderatorId
  }

  updateCounter = () => {
    return FlagItem.counter + 1
  }

  updateMessageCounter = () => {
    return this.messageIdCounter + 1
  }

  generateLoremIpsemMessages(num?: number): FlagMessage[] {
    const messages: FlagMessage[] = []
    if (num) {
      if (num === 0) return messages
      this.messagesRequested = num
    }

    while (this.messagesRequested > this.messageIdCounter) {
      this.messageIdCounter = this.updateMessageCounter()
      messages.push({
        messageId: this.messageIdCounter.toString(),
        flagId: FlagItem.counter.toString(),
        authorId: this.userId,
        recipient: this.moderatorId,
        messageDate: DateTime.local().toString(),
        messageText: lI.generateWords(9)
      })
    }

    return messages
  }

  createLoremIpsemFlag(): Flag {
    FlagItem.counter = this.updateCounter()
    const aFlag: Flag = {
      id: FlagItem.counter.toString(),
      flagTime: DateTime.local().toJSDate().toTimeString(),
      testimonyId: "1234",
      testimonyText: lI.generateWords(50),
      userId: this.userId,
      userReason: lI.generateWords(9),
      moderatorId: this.moderatorId,
      status: "unread",
      moderatorComment: lI.generateWords(12),
      moderationDate: DateTime.local().toJSDate().toTimeString(),
      removed: false,
      removedDate: DateTime.local().toJSDate().toTimeString(),
      resolved: false,
      resolvedDate: DateTime.local().toJSDate().toTimeString(),
      messages: this.generateLoremIpsemMessages()
    }

    return aFlag
  }
}

export const loadFlags = async () => {
  const FF = new FlagItem("firstMod")
  const lIFlag = FF.createLoremIpsemFlag()
  console.log("testing lIFlag", lIFlag.userId, lIFlag.id)

  const ref = doc(firestore, "flags", lIFlag.id)

  await setDoc(ref, lIFlag)
}
