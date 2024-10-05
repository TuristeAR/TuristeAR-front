import { CommunityFilters } from './CommunityFilters';
const infoTrips = [
  {
    title: 'Mis viajes',
    users: [
      { imgPerson: '/assets/person.svg', user: 'Buenos Aires - 9 días' },
      { imgPerson: '/assets/person.svg', user: 'Córdoba - 12 días' },
      { imgPerson: '/assets/person.svg', user: 'Salta - 18 días' },
      { imgPerson: '/assets/person.svg', user: 'San Luis - 4 días' },
      { imgPerson: '/assets/person.svg', user: 'Formosa - 11 días' },
      { imgPerson: '/assets/person.svg', user: 'Santa Fe - 23 días' },
    ],
    link: 'viajes',
  },
];

const infoFriends = [
  {
    title: 'Mis amigos',
    users: [
      { imgPerson: '/assets/person.svg', user: 'Lucas Ramirez' },
      { imgPerson: '/assets/person.svg', user: 'Carlos Morales' },
      { imgPerson: '/assets/person.svg', user: 'Juanfer Fernandez' },
      { imgPerson: '/assets/person.svg', user: 'Gonzalo Martinez' },
      { imgPerson: '/assets/person.svg', user: 'Germán Gonzalez' },
      { imgPerson: '/assets/person.svg', user: 'John Hernandez' },
    ],
    link: 'friends',
  },
];

export function RightCommunity() {
  return (
    <>
      <div className="w-[18%] p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-y-4">
            {infoTrips.map((trip, index) => (
              <CommunityFilters
                key={index}
                title={trip.title}
                users={trip.users}
                link={trip.link}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          {infoFriends.map((friend, index) => (
            <CommunityFilters
              key={index}
              title={friend.title}
              users={friend.users}
              link={friend.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}
