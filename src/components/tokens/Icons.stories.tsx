'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState, useMemo } from 'react'
import type { RemixiconComponentType } from '@remixicon/react'
import {
  // ── Food & Beverage ──────────────────────────────────────────────────────
  RiRestaurantLine,   RiRestaurantFill,
  RiRestaurant2Line,  RiRestaurant2Fill,
  RiKnifeLine,        RiKnifeFill,
  RiBowlLine,         RiBowlFill,
  RiBreadLine,        RiBreadFill,
  RiCakeLine,         RiCakeFill,
  RiCake2Line,        RiCake2Fill,
  RiCookieLine,       RiCookieFill,
  RiDrinksLine,       RiDrinksFill,
  RiDrinks2Line,      RiDrinks2Fill,
  RiGobletLine,       RiGobletFill,
  RiCupLine,          RiCupFill,
  RiLeafLine,         RiLeafFill,
  RiAppleLine,        RiAppleFill,
  RiFridgeLine,       RiFridgeFill,
  RiBeerLine,         RiBeerFill,
  // ── Catering & Events ───────────────────────────────────────────────────
  RiSparklingLine,    RiSparklingFill,
  RiSparkling2Line,   RiSparkling2Fill,
  RiVipCrownLine,     RiVipCrownFill,
  RiAwardLine,        RiAwardFill,
  RiTrophyLine,       RiTrophyFill,
  RiMedalLine,        RiMedalFill,
  RiGiftLine,         RiGiftFill,
  RiStoreLine,        RiStoreFill,
  RiBuilding2Line,    RiBuilding2Fill,
  RiHotelLine,        RiHotelFill,
  RiCalendarEventLine,RiCalendarEventFill,
  RiCalendarCheckLine,RiCalendarCheckFill,
  // ── Orders & Payments ───────────────────────────────────────────────────
  RiShoppingCartLine, RiShoppingCartFill,
  RiShoppingBagLine,  RiShoppingBagFill,
  RiReceiptLine,      RiReceiptFill,
  RiBankCardLine,     RiBankCardFill,
  RiWalletLine,       RiWalletFill,
  RiBillLine,         RiBillFill,
  RiMoneyDollarCircleLine, RiMoneyDollarCircleFill,
  RiPriceTagLine,     RiPriceTagFill,
  RiCouponLine,       RiCouponFill,
  RiPercentLine,      RiPercentFill,
  RiTicketLine,       RiTicketFill,
  // ── Customers & Teams ───────────────────────────────────────────────────
  RiUserLine,         RiUserFill,
  RiUserAddLine,      RiUserAddFill,
  RiUserFollowLine,   RiUserFollowFill,
  RiUserStarLine,     RiUserStarFill,
  RiUserSettingsLine, RiUserSettingsFill,
  RiTeamLine,         RiTeamFill,
  RiGroupLine,        RiGroupFill,
  RiAccountCircleLine,RiAccountCircleFill,
  RiContactsBookLine, RiContactsBookFill,
  RiBriefcaseLine,    RiBriefcaseFill,
  // ── Scheduling & Time ───────────────────────────────────────────────────
  RiCalendarLine,     RiCalendarFill,
  RiCalendar2Line,    RiCalendar2Fill,
  RiTimeLine,         RiTimeFill,
  RiTimerLine,        RiTimerFill,
  RiAlarmLine,        RiAlarmFill,
  RiBellLine,         RiBellFill,
  RiNotificationLine, RiNotificationFill,
  RiHourglassLine,    RiHourglassFill,
  // ── Delivery & Location ─────────────────────────────────────────────────
  RiTruckLine,        RiTruckFill,
  RiMapPinLine,       RiMapPinFill,
  RiMapLine,          RiMapFill,
  RiNavigationLine,   RiNavigationFill,
  RiGlobalLine,       RiGlobalFill,
  RiEBikeLine,        RiEBikeFill,
  RiMotorbikeLine,    RiMotorbikeFill,
  RiRouteLine,        RiRouteFill,
  // ── Communication ───────────────────────────────────────────────────────
  RiMailLine,         RiMailFill,
  RiInboxLine,        RiInboxFill,
  RiSendPlaneLine,    RiSendPlaneFill,
  RiMessageLine,      RiMessageFill,
  RiMessage2Line,     RiMessage2Fill,
  RiPhoneLine,        RiPhoneFill,
  RiChatSmileLine,    RiChatSmileFill,
  RiAtLine,           RiAtFill,
  // ── Documents & Files ───────────────────────────────────────────────────
  RiFileTextLine,     RiFileTextFill,
  RiFilePaperLine,    RiFilePaperFill,
  RiFileListLine,     RiFileListFill,
  RiFileCheckLine,    RiFileCheckFill,
  RiContractLine,     RiContractFill,
  RiPrinterLine,      RiPrinterFill,
  RiBookOpenLine,     RiBookOpenFill,
  // ── Analytics & Reporting ───────────────────────────────────────────────
  RiDashboardLine,    RiDashboardFill,
  RiBarChartLine,     RiBarChartFill,
  RiBarChart2Line,    RiBarChart2Fill,
  RiPieChartLine,     RiPieChartFill,
  RiPieChart2Line,    RiPieChart2Fill,
  RiDonutChartLine,   RiDonutChartFill,
  RiLineChartLine,    RiLineChartFill,
  RiAreaChartLine,    RiAreaChartFill,
  RiTableLine,        RiTableFill,
  // ── Interface & Navigation ──────────────────────────────────────────────
  RiHomeLine,         RiHomeFill,
  RiSearchLine,       RiSearchFill,
  RiFilterLine,       RiFilterFill,
  RiSettingsLine,     RiSettingsFill,
  RiMenuLine,         RiMenuFill,
  RiLayoutGridLine,   RiLayoutGridFill,
  RiMoreLine,         RiMoreFill,
  RiMore2Line,        RiMore2Fill,
  RiAddCircleLine,    RiAddCircleFill,
  RiCloseLine,        RiCloseFill,
  RiArrowRightLine,   RiArrowRightFill,
  RiArrowLeftLine,    RiArrowLeftFill,
  RiArrowDownSLine,   RiArrowDownSFill,
  RiArrowRightSLine,  RiArrowRightSFill,
  RiDownloadLine,     RiDownloadFill,
  RiUploadLine,       RiUploadFill,
  RiShareLine,        RiShareFill,
  RiLinksLine,        RiLinksFill,
  RiExternalLinkLine, RiExternalLinkFill,
  RiEyeLine,          RiEyeFill,
  RiEyeOffLine,       RiEyeOffFill,
  RiLockLine,         RiLockFill,
  RiShieldLine,       RiShieldFill,
  RiRefreshLine,      RiRefreshFill,
  // ── Status & Feedback ───────────────────────────────────────────────────
  RiCheckboxCircleLine,  RiCheckboxCircleFill,
  RiCloseCircleLine,     RiCloseCircleFill,
  RiErrorWarningLine,    RiErrorWarningFill,
  RiInformationLine,     RiInformationFill,
  RiQuestionLine,        RiQuestionFill,
  RiShieldCheckLine,     RiShieldCheckFill,
  RiStarLine,            RiStarFill,
  RiThumbUpLine,         RiThumbUpFill,
  RiHeartLine,           RiHeartFill,
  RiFireLine,            RiFireFill,
} from '@remixicon/react'

import { TokenGroupHeading } from './token-utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface IconDef {
  name: string
  line: RemixiconComponentType
  fill: RemixiconComponentType
}

interface IconCategory {
  id: string
  label: string
  description: string
  icons: IconDef[]
}

// ─── Icon catalogue ───────────────────────────────────────────────────────────

const CATEGORIES: IconCategory[] = [
  {
    id: 'food',
    label: 'Food & Beverage',
    description: 'Ingredients, dishes, and drinks — for menu builders, item cards, and dietary labels.',
    icons: [
      { name: 'Restaurant',        line: RiRestaurantLine,   fill: RiRestaurantFill   },
      { name: 'Restaurant2',       line: RiRestaurant2Line,  fill: RiRestaurant2Fill  },
      { name: 'Knife',             line: RiKnifeLine,        fill: RiKnifeFill        },
      { name: 'Bowl',              line: RiBowlLine,         fill: RiBowlFill         },
      { name: 'Bread',             line: RiBreadLine,        fill: RiBreadFill        },
      { name: 'Cake',              line: RiCakeLine,         fill: RiCakeFill         },
      { name: 'Cake2',             line: RiCake2Line,        fill: RiCake2Fill        },
      { name: 'Cookie',            line: RiCookieLine,       fill: RiCookieFill       },
      { name: 'Drinks',            line: RiDrinksLine,       fill: RiDrinksFill       },
      { name: 'Drinks2',           line: RiDrinks2Line,      fill: RiDrinks2Fill      },
      { name: 'Goblet',            line: RiGobletLine,       fill: RiGobletFill       },
      { name: 'Cup',               line: RiCupLine,          fill: RiCupFill          },
      { name: 'Leaf',              line: RiLeafLine,         fill: RiLeafFill         },
      { name: 'Apple',             line: RiAppleLine,        fill: RiAppleFill        },
      { name: 'Fridge',            line: RiFridgeLine,       fill: RiFridgeFill       },
      { name: 'Beer',              line: RiBeerLine,         fill: RiBeerFill         },
    ],
  },
  {
    id: 'catering',
    label: 'Catering & Events',
    description: 'Event management, service setup, and venue — for booking flows and event dashboards.',
    icons: [
      { name: 'Sparkling',         line: RiSparklingLine,    fill: RiSparklingFill    },
      { name: 'Sparkling2',        line: RiSparkling2Line,   fill: RiSparkling2Fill   },
      { name: 'VipCrown',          line: RiVipCrownLine,     fill: RiVipCrownFill     },
      { name: 'Award',             line: RiAwardLine,        fill: RiAwardFill        },
      { name: 'Trophy',            line: RiTrophyLine,       fill: RiTrophyFill       },
      { name: 'Medal',             line: RiMedalLine,        fill: RiMedalFill        },
      { name: 'Gift',              line: RiGiftLine,         fill: RiGiftFill         },
      { name: 'Store',             line: RiStoreLine,        fill: RiStoreFill        },
      { name: 'Building2',         line: RiBuilding2Line,    fill: RiBuilding2Fill    },
      { name: 'Hotel',             line: RiHotelLine,        fill: RiHotelFill        },
      { name: 'CalendarEvent',     line: RiCalendarEventLine,fill: RiCalendarEventFill},
      { name: 'CalendarCheck',     line: RiCalendarCheckLine,fill: RiCalendarCheckFill},
    ],
  },
  {
    id: 'orders',
    label: 'Orders & Payments',
    description: 'Commerce, billing, and pricing — for order summaries, invoices, and payment flows.',
    icons: [
      { name: 'ShoppingCart',      line: RiShoppingCartLine,      fill: RiShoppingCartFill      },
      { name: 'ShoppingBag',       line: RiShoppingBagLine,       fill: RiShoppingBagFill       },
      { name: 'Receipt',           line: RiReceiptLine,           fill: RiReceiptFill           },
      { name: 'BankCard',          line: RiBankCardLine,          fill: RiBankCardFill          },
      { name: 'Wallet',            line: RiWalletLine,            fill: RiWalletFill            },
      { name: 'Bill',              line: RiBillLine,              fill: RiBillFill              },
      { name: 'MoneyDollarCircle', line: RiMoneyDollarCircleLine, fill: RiMoneyDollarCircleFill },
      { name: 'PriceTag',          line: RiPriceTagLine,          fill: RiPriceTagFill          },
      { name: 'Coupon',            line: RiCouponLine,            fill: RiCouponFill            },
      { name: 'Percent',           line: RiPercentLine,           fill: RiPercentFill           },
      { name: 'Ticket',            line: RiTicketLine,            fill: RiTicketFill            },
    ],
  },
  {
    id: 'people',
    label: 'Customers & Teams',
    description: 'People management — for customer profiles, staff, permissions, and contact cards.',
    icons: [
      { name: 'User',              line: RiUserLine,          fill: RiUserFill          },
      { name: 'UserAdd',           line: RiUserAddLine,       fill: RiUserAddFill       },
      { name: 'UserFollow',        line: RiUserFollowLine,    fill: RiUserFollowFill    },
      { name: 'UserStar',          line: RiUserStarLine,      fill: RiUserStarFill      },
      { name: 'UserSettings',      line: RiUserSettingsLine,  fill: RiUserSettingsFill  },
      { name: 'Team',              line: RiTeamLine,          fill: RiTeamFill          },
      { name: 'Group',             line: RiGroupLine,         fill: RiGroupFill         },
      { name: 'AccountCircle',     line: RiAccountCircleLine, fill: RiAccountCircleFill },
      { name: 'ContactsBook',      line: RiContactsBookLine,  fill: RiContactsBookFill  },
      { name: 'Briefcase',         line: RiBriefcaseLine,     fill: RiBriefcaseFill     },
    ],
  },
  {
    id: 'scheduling',
    label: 'Scheduling & Time',
    description: 'Dates, times, and reminders — for booking calendars, countdowns, and notifications.',
    icons: [
      { name: 'Calendar',          line: RiCalendarLine,      fill: RiCalendarFill      },
      { name: 'Calendar2',         line: RiCalendar2Line,     fill: RiCalendar2Fill     },
      { name: 'Time',              line: RiTimeLine,          fill: RiTimeFill          },
      { name: 'Timer',             line: RiTimerLine,         fill: RiTimerFill         },
      { name: 'Alarm',             line: RiAlarmLine,         fill: RiAlarmFill         },
      { name: 'Bell',              line: RiBellLine,          fill: RiBellFill          },
      { name: 'Notification',      line: RiNotificationLine,  fill: RiNotificationFill  },
      { name: 'Hourglass',         line: RiHourglassLine,     fill: RiHourglassFill     },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery & Location',
    description: 'Logistics and venues — for delivery tracking, maps, and venue selection.',
    icons: [
      { name: 'Truck',             line: RiTruckLine,        fill: RiTruckFill        },
      { name: 'MapPin',            line: RiMapPinLine,       fill: RiMapPinFill       },
      { name: 'Map',               line: RiMapLine,          fill: RiMapFill          },
      { name: 'Navigation',        line: RiNavigationLine,   fill: RiNavigationFill   },
      { name: 'Global',            line: RiGlobalLine,       fill: RiGlobalFill       },
      { name: 'EBike',             line: RiEBikeLine,        fill: RiEBikeFill        },
      { name: 'Motorbike',         line: RiMotorbikeLine,    fill: RiMotorbikeFill    },
      { name: 'Route',             line: RiRouteLine,        fill: RiRouteFill        },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    description: 'Messaging and contact — for notifications, customer outreach, and support.',
    icons: [
      { name: 'Mail',              line: RiMailLine,        fill: RiMailFill        },
      { name: 'Inbox',             line: RiInboxLine,       fill: RiInboxFill       },
      { name: 'SendPlane',         line: RiSendPlaneLine,   fill: RiSendPlaneFill   },
      { name: 'Message',           line: RiMessageLine,     fill: RiMessageFill     },
      { name: 'Message2',          line: RiMessage2Line,    fill: RiMessage2Fill    },
      { name: 'Phone',             line: RiPhoneLine,       fill: RiPhoneFill       },
      { name: 'ChatSmile',         line: RiChatSmileLine,   fill: RiChatSmileFill   },
      { name: 'At',                line: RiAtLine,          fill: RiAtFill          },
    ],
  },
  {
    id: 'documents',
    label: 'Documents & Files',
    description: 'Contracts, menus, and reports — for document management and print workflows.',
    icons: [
      { name: 'FileText',          line: RiFileTextLine,   fill: RiFileTextFill   },
      { name: 'FilePaper',         line: RiFilePaperLine,  fill: RiFilePaperFill  },
      { name: 'FileList',          line: RiFileListLine,   fill: RiFileListFill   },
      { name: 'FileCheck',         line: RiFileCheckLine,  fill: RiFileCheckFill  },
      { name: 'Contract',          line: RiContractLine,   fill: RiContractFill   },
      { name: 'Printer',           line: RiPrinterLine,    fill: RiPrinterFill    },
      { name: 'BookOpen',          line: RiBookOpenLine,   fill: RiBookOpenFill   },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & Reporting',
    description: 'Data visualisation — for dashboards, revenue charts, and performance summaries.',
    icons: [
      { name: 'Dashboard',         line: RiDashboardLine,   fill: RiDashboardFill   },
      { name: 'BarChart',          line: RiBarChartLine,    fill: RiBarChartFill    },
      { name: 'BarChart2',         line: RiBarChart2Line,   fill: RiBarChart2Fill   },
      { name: 'PieChart',          line: RiPieChartLine,    fill: RiPieChartFill    },
      { name: 'PieChart2',         line: RiPieChart2Line,   fill: RiPieChart2Fill   },
      { name: 'DonutChart',        line: RiDonutChartLine,  fill: RiDonutChartFill  },
      { name: 'LineChart',         line: RiLineChartLine,   fill: RiLineChartFill   },
      { name: 'AreaChart',         line: RiAreaChartLine,   fill: RiAreaChartFill   },
      { name: 'Table',             line: RiTableLine,       fill: RiTableFill       },
    ],
  },
  {
    id: 'interface',
    label: 'Interface & Navigation',
    description: 'UI chrome and actions — for nav bars, toolbars, modals, and general interactions.',
    icons: [
      { name: 'Home',              line: RiHomeLine,         fill: RiHomeFill         },
      { name: 'Search',            line: RiSearchLine,       fill: RiSearchFill       },
      { name: 'Filter',            line: RiFilterLine,       fill: RiFilterFill       },
      { name: 'Settings',          line: RiSettingsLine,     fill: RiSettingsFill     },
      { name: 'Menu',              line: RiMenuLine,         fill: RiMenuFill         },
      { name: 'LayoutGrid',        line: RiLayoutGridLine,   fill: RiLayoutGridFill   },
      { name: 'More',              line: RiMoreLine,         fill: RiMoreFill         },
      { name: 'More2',             line: RiMore2Line,        fill: RiMore2Fill        },
      { name: 'AddCircle',         line: RiAddCircleLine,    fill: RiAddCircleFill    },
      { name: 'Close',             line: RiCloseLine,        fill: RiCloseFill        },
      { name: 'ArrowRight',        line: RiArrowRightLine,   fill: RiArrowRightFill   },
      { name: 'ArrowLeft',         line: RiArrowLeftLine,    fill: RiArrowLeftFill    },
      { name: 'ArrowDownS',        line: RiArrowDownSLine,   fill: RiArrowDownSFill   },
      { name: 'ArrowRightS',       line: RiArrowRightSLine,  fill: RiArrowRightSFill  },
      { name: 'Download',          line: RiDownloadLine,     fill: RiDownloadFill     },
      { name: 'Upload',            line: RiUploadLine,       fill: RiUploadFill       },
      { name: 'Share',             line: RiShareLine,        fill: RiShareFill        },
      { name: 'Links',             line: RiLinksLine,        fill: RiLinksFill        },
      { name: 'ExternalLink',      line: RiExternalLinkLine, fill: RiExternalLinkFill },
      { name: 'Eye',               line: RiEyeLine,          fill: RiEyeFill          },
      { name: 'EyeOff',            line: RiEyeOffLine,       fill: RiEyeOffFill       },
      { name: 'Lock',              line: RiLockLine,         fill: RiLockFill         },
      { name: 'Shield',            line: RiShieldLine,       fill: RiShieldFill       },
      { name: 'Refresh',           line: RiRefreshLine,      fill: RiRefreshFill      },
    ],
  },
  {
    id: 'status',
    label: 'Status & Feedback',
    description: 'System states — for alerts, confirmations, errors, ratings, and empty states.',
    icons: [
      { name: 'CheckboxCircle',    line: RiCheckboxCircleLine, fill: RiCheckboxCircleFill },
      { name: 'CloseCircle',       line: RiCloseCircleLine,    fill: RiCloseCircleFill    },
      { name: 'ErrorWarning',      line: RiErrorWarningLine,   fill: RiErrorWarningFill   },
      { name: 'Information',       line: RiInformationLine,    fill: RiInformationFill    },
      { name: 'Question',          line: RiQuestionLine,       fill: RiQuestionFill       },
      { name: 'ShieldCheck',       line: RiShieldCheckLine,    fill: RiShieldCheckFill    },
      { name: 'Star',              line: RiStarLine,           fill: RiStarFill           },
      { name: 'ThumbUp',           line: RiThumbUpLine,        fill: RiThumbUpFill        },
      { name: 'Heart',             line: RiHeartLine,          fill: RiHeartFill          },
      { name: 'Fire',              line: RiFireLine,           fill: RiFireFill           },
    ],
  },
]

// ─── Icon Card ────────────────────────────────────────────────────────────────

function IconCard({ name, line: LineCmp, fill: FillCmp }: IconDef) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `import { Ri${name}Line, Ri${name}Fill } from '@remixicon/react'`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      title={`Click to copy import for Ri${name}Line / Ri${name}Fill`}
      className="
        group flex flex-col items-center gap-3 p-4 rounded-xl
        border border-border bg-card
        hover:border-[#9cd8b5] hover:bg-[#e6f5ed]
        active:scale-[0.97]
        transition-all duration-150 cursor-pointer text-left w-full
      "
    >
      {/* Outline + Filled side by side */}
      <div className="flex items-center gap-3">
        {/* Outline */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <LineCmp
              size={20}
              className="text-foreground group-hover:text-[#073d30] transition-colors duration-150"
            />
          </div>
          <span className="text-[10px] text-muted-foreground">line</span>
        </div>
        {/* Filled */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <FillCmp
              size={20}
              className="text-foreground group-hover:text-[#073d30] transition-colors duration-150"
            />
          </div>
          <span className="text-[10px] text-muted-foreground">fill</span>
        </div>
      </div>

      {/* Name */}
      <p className="text-[11px] font-medium text-foreground text-center leading-tight break-all">
        {name}
      </p>

      {/* Copy feedback */}
      <span className={`
        text-[10px] font-medium transition-colors duration-150
        ${copied ? 'text-[#067e39]' : 'text-muted-foreground group-hover:text-[#073d30]'}
      `}>
        {copied ? '✓ copied' : 'click to copy'}
      </span>
    </button>
  )
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({ category }: { category: IconCategory }) {
  return (
    <section>
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: 'var(--font-title)' }}>
            {category.label}
          </h3>
          <span className="text-xs text-muted-foreground">{category.icons.length} icons</span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{category.description}</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {category.icons.map((ic) => (
          <IconCard key={ic.name} {...ic} />
        ))}
      </div>
    </section>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Tokens/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Icon library for the Cater design system — sourced from **[@remixicon/react](https://remixicon.com)** v4.9.

Icons are curated and categorised around what a catering product needs: food, events, orders, scheduling, delivery, and more.

---

### Two styles

Each icon ships as two separate SVG components:

| Style | Component | Use for |
|---|---|---|
| **Line** | \`Ri{Name}Line\` | Inactive nav, secondary actions, decorative |
| **Fill** | \`Ri{Name}Fill\` | Active nav, primary indicators, emphasis |

Unlike Lucide, Remix Icons do **not** use \`strokeWidth\` or \`fill\` props — the line/fill distinction is a different component entirely. Each renders a clean, optimised SVG.

---

### Usage

\`\`\`tsx
import { RiRestaurantLine, RiRestaurantFill } from '@remixicon/react'

// Line (outline) — secondary / inactive
<RiRestaurantLine size={20} className="text-muted-foreground" />

// Fill — primary / active
<RiRestaurantFill size={20} className="text-foreground" />

// With Cater sizing tokens
<RiReceiptLine size={16} />  // sm — inline / chips
<RiReceiptLine size={20} />  // md — buttons / inputs (default)
<RiReceiptLine size={24} />  // lg — section headers
\`\`\`

---

### Sizing guide

| Size | Tailwind | Use case |
|---|---|---|
| 16px | \`size-4\` | Inline text, chips, badges |
| 20px | \`size-5\` | Buttons, input addons (default) |
| 24px | \`size-6\` | Section headers, nav items |
| 32px | \`size-8\` | Empty states, feature tiles |
| 48px | \`size-12\` | Hero / illustration spots |

---

### Click any icon to copy its import statement.
        `,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────────────────────────────────────
// 1. All Icons — searchable, categorised
// ─────────────────────────────────────────────────────────────────────────────

export const AllIcons: Story = {
  name: 'All Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full icon catalogue — search by name, filter by category, or click any icon to copy its import.',
      },
    },
  },
  render: () => {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState<string>('all')

    const total = CATEGORIES.reduce((n, c) => n + c.icons.length, 0)

    const filtered = useMemo(() => {
      const q = search.toLowerCase().trim()
      return CATEGORIES
        .filter(c => activeCategory === 'all' || c.id === activeCategory)
        .map(c => ({
          ...c,
          icons: q ? c.icons.filter(ic => ic.name.toLowerCase().includes(q)) : c.icons,
        }))
        .filter(c => c.icons.length > 0)
    }, [search, activeCategory])

    const filteredTotal = filtered.reduce((n, c) => n + c.icons.length, 0)

    return (
      <div className="p-6 space-y-8 bg-background min-h-screen">
        <TokenGroupHeading
          title="Icons"
          description={`${total} icons curated for catering products — click any to copy its import statement.`}
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sticky top-0 bg-background/95 backdrop-blur py-3 -mx-6 px-6 border-b border-border z-10">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <RiSearchLine
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search icons…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="
                w-full pl-8 pr-3 py-2 text-sm rounded-lg
                border border-border bg-card text-foreground
                placeholder:text-muted-foreground
                focus:outline-none focus:border-[#9cd8b5] focus:shadow-[0_0_0_2px_#ceecda]
                transition-[border-color,box-shadow] duration-150
              "
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {[{ id: 'all', label: 'All' }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label }))].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer
                  ${activeCategory === cat.id
                    ? 'bg-[#073d30] text-[#ccf8b9] border-[#073d30]'
                    : 'bg-card text-muted-foreground border-border hover:border-[#9cd8b5] hover:text-foreground'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        {search && (
          <p className="text-sm text-muted-foreground -mt-4">
            {filteredTotal} result{filteredTotal !== 1 ? 's' : ''} for &quot;{search}&quot;
          </p>
        )}

        {/* Icon grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <RiSearchLine size={40} className="opacity-40" />
            <p className="mt-3 text-sm">No icons match &quot;{search}&quot;</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map(cat => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-category stories for quick browsing
// ─────────────────────────────────────────────────────────────────────────────

const makeCategoryStory = (id: string): Story => ({
  name: CATEGORIES.find(c => c.id === id)!.label,
  parameters: { layout: 'padded' },
  render: () => {
    const cat = CATEGORIES.find(c => c.id === id)!
    return (
      <div className="p-6 bg-background min-h-screen">
        <CategorySection category={cat} />
      </div>
    )
  },
})

export const FoodAndBeverage     = makeCategoryStory('food')
export const CateringAndEvents   = makeCategoryStory('catering')
export const OrdersAndPayments   = makeCategoryStory('orders')
export const CustomersAndTeams   = makeCategoryStory('people')
export const SchedulingAndTime   = makeCategoryStory('scheduling')
export const DeliveryAndLocation = makeCategoryStory('delivery')
export const Communication       = makeCategoryStory('communication')
export const DocumentsAndFiles   = makeCategoryStory('documents')
export const AnalyticsReporting  = makeCategoryStory('analytics')
export const InterfaceNavigation = makeCategoryStory('interface')
export const StatusAndFeedback   = makeCategoryStory('status')
