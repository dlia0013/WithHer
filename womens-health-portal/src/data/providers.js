
export const providers = [
  { id: 'prov_1001', name: 'City Women GP Clinic',   type: 'gp',     postcode: '3000', address: '123 Collins St, Melbourne VIC' },
  { id: 'prov_1002', name: 'Sunshine OBGYN Centre',  type: 'obgyn',  postcode: '3020', address: '45 Hampshire Rd, Sunshine VIC' },
  { id: 'prov_1003', name: 'Northside Mental Health',type: 'mental', postcode: '3072', address: '10 High St, Preston VIC' },
  { id: 'prov_1004', name: 'Riverside Physio',       type: 'physio', postcode: '3121', address: '1 Swan St, Richmond VIC' },
  { id: 'prov_1005', name: 'West GP & Family',       type: 'gp',     postcode: '3024', address: '8 Palmers Rd, Truganina VIC' }
];

export const getProviderById = (id) =>
  providers.find(p => String(p.id) === String(id));