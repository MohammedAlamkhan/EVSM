import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'sales',
    title: 'Sales-Order',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'credit-card',
    url: 'sales'
  },
  {
    id: 'assets',
    title: 'Assets',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'slack',
    url: 'assets'
  },
  {
    id: 'irf',
    title: 'IRF',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'bookmark',
    url: 'irf'
  },
  {
    id: 'request',
    title: 'Inbox',
    translate: 'MENU.SAMPLE',
    type: 'collapsible',
    icon: 'grid',
    children: [
      // {
      //   id: 'irf',
      //   title: 'IRF',
      //   translate: 'MENU.SAMPLE',
      //   type: 'item',
      //   icon: 'circle',
      //   url: 'request/irf'
      // },
      {
        id: 'survey',
        title: 'Survey',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'request/survey'
      },
      {
        id: 'installation',
        title: 'Installation',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'request/installation'
      },
      {
        id: 'commissioning',
        title: 'Commissioning',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'request/commissioning'
      },
    ]
  },
  {
    id: 'approval',
    title: 'Manage Request',
    translate: 'MENU.SAMPLE',
    type: 'collapsible',
    icon: 'check-square',
    children: [
     
      {
        id: 'approval-survey',
        title: 'Survey',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'approval/survey'
      },
      {
        id: 'installation',
        title: 'Installation',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'approval/installation'
      },
      {
        id: 'commissioning',
        title: 'Commissioning',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'approval/commissioning'
      },
     
    ]
  },
  {
    id: 'reports',
    title: 'Report',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'layers',
    url: 'reports'
  },
  {
    id: 'manage-user',
    title: 'Manage User',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'users',
    url: 'manage-user'
  },
  {
    id: 'logout',
    title: 'Logout',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'log-out',
    url: 'logout'
  },
]
