const services = [
  'Agencias de viajes',
  'Oficinas de turismo',
  'Hoteles y alojamientos',
  'Restaurantes',
  'Cafeterías',
  'Bares y pubs',
  'Transporte público (buses y trenes)',
  'Servicios de taxi y ridesharing',
  'Alquiler de bicicletas y scooters',
  'Guías turísticos',
  'Parques temáticos',
  'Cines',
  'Teatros y salas de conciertos',
  'Museos y galerías de arte',
  'Centros comerciales',
  'Mercados y ferias artesanales',
]

export function search({ query = '' }: { query?: string | null }) {
  return new Promise(resolve => {
    setTimeout(resolve, 500)
  }).then(() => {
    if (query && query.length > 0) {
      return services.filter(service =>
        service.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
    }
    return services
  })
}
