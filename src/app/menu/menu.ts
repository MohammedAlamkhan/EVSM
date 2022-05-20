import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    name: 'Home',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'sales',
    name: 'Sales-Order',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'credit-card',
    url: 'sales'
  },
  {
    id: 'assets',
    name: 'Assets',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'slack',
    url: 'assets'
  },
  {
    id: 'irf',
    name: 'IRF',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'bookmark',
    url: 'irf'
  },
  {
    id: 'request',
    name: 'Inbox',
    translate: 'MENU.SAMPLE',
    type: 'collapsible',
    icon: 'grid',
    children: [
      // {
      //   id: 'irf',
      //   name: 'IRF',
      //   translate: 'MENU.SAMPLE',
      //   type: 'item',
      //   icon: 'circle',
      //   url: 'request/irf'
      // },
      {
        id: 'survey',
        name: 'Survey',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'request/survey'
      },
      {
        id: 'installation',
        name: 'Installation',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'request/installation'
      },
      {
        id: 'commissioning',
        name: 'Commissioning',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'request/commissioning'
      },
    ]
  },
  {
    id: 'approval',
    name: 'Manage Request',
    translate: 'MENU.SAMPLE',
    type: 'collapsible',
    icon: 'check-square',
    children: [
     
      {
        id: 'approval-survey',
        name: 'Survey',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'approval/survey'
      },
      {
        id: 'installation',
        name: 'Installation',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'approval/installation'
      },
      {
        id: 'commissioning',
        name: 'Commissioning',
        translate: 'MENU.SAMPLE',
        type: 'item',
        icon: 'circle',
        url: 'approval/commissioning'
      },
     
    ]
  },
  {
    id: 'reports',
    name: 'Report',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'layers',
    url: 'reports'
  },
  {
    id: 'manage-user',
    name: 'Manage User',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'users',
    url: 'manage-user'
  },
  {
    id: 'logout',
    name: 'Logout',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'log-out',
    url: 'logout'
  },
]
