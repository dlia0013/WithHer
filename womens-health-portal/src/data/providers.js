export const providers = [
  {
    id: 'prov_1001',
    name: 'City Women GP Clinic',
    type: 'gp',
    postcode: '3000',
    address: '123 Collins St, Melbourne VIC',
    email: 'info@citywomengp.com.au',
    phone: '(03) 9012 3456'
  },
  {
    id: 'prov_1002',
    name: 'Sunshine OBGYN Centre',
    type: 'obgyn',
    postcode: '3020',
    address: '45 Hampshire Rd, Sunshine VIC',
    email: 'care@sunshineobgyn.com.au',
    phone: '(03) 9371 1122'
  },
  {
    id: 'prov_1003',
    name: 'Northside Mental Health',
    type: 'mental',
    postcode: '3072',
    address: '10 High St, Preston VIC',
    email: 'hello@northsidemental.com.au',
    phone: '(03) 9484 7000'
  },
  {
    id: 'prov_1004',
    name: 'Riverside Physio',
    type: 'physio',
    postcode: '3121',
    address: '1 Swan St, Richmond VIC',
    email: 'bookings@riversidephysio.com.au',
    phone: '(03) 9816 2210'
  },
  {
    id: 'prov_1005',
    name: 'West GP & Family',
    type: 'gp',
    postcode: '3024',
    address: '8 Palmers Rd, Truganina VIC',
    email: 'reception@westgp.com.au',
    phone: '(03) 9748 8800'
  },
  {
    id: 'prov_1006',
    name: 'East Melbourne Medical Hub',
    type: 'gp',
    postcode: '3002',
    address: '77 Albert St, East Melbourne VIC',
    email: 'east@medhub.com.au',
    phone: '(03) 9417 5600'
  },
  {
    id: 'prov_1007',
    name: 'Brighton Physiotherapy Centre',
    type: 'physio',
    postcode: '3186',
    address: '60 Church St, Brighton VIC',
    email: 'team@brightonphysio.com.au',
    phone: '(03) 9592 4400'
  },
  {
    id: 'prov_1008',
    name: 'Glen Waverley OBGYN',
    type: 'obgyn',
    postcode: '3150',
    address: '88 Springvale Rd, Glen Waverley VIC',
    email: 'hello@glenobgyn.com.au',
    phone: '(03) 9560 7788'
  },
  {
    id: 'prov_1009',
    name: 'Mindful Steps Therapy',
    type: 'mental',
    postcode: '3145',
    address: '3 Waverley Rd, Malvern East VIC',
    email: 'contact@mindfulsteps.com.au',
    phone: '(03) 9821 3333'
  },
  {
    id: 'prov_1010',
    name: 'Carlton GP & Wellness',
    type: 'gp',
    postcode: '3053',
    address: '101 Lygon St, Carlton VIC',
    email: 'info@carltongp.com.au',
    phone: '(03) 9347 2100'
  }
];

export const getProviderById = (id) =>
  providers.find(p => String(p.id) === String(id));