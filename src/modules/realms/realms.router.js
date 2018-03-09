import VCreateRealm from '@/modules/realms/views/VCreateRealm'
import VListCitizens from '@/modules/realms/views/VListCitizens'

export default [
  {
    path: '/create',
    name: 'create',
    component: VCreateRealm
  },
  {
    path: '/list',
    name: 'list',
    component: VListCitizens
  }
]
