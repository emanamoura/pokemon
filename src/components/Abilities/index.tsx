import './style.scss';

export interface IAbility { 
    ability : {
        name: string;
    }
}

interface AbilitiesProps {
    abilities: IAbility[]
    color: string;
}

export function Abilities({abilities, color} : AbilitiesProps) {
    
    return (
        <div className='abilities' style={{backgroundColor: color}}>
            <p>Abilities</p>
            <div>
                {abilities.map(ability => {
                    return (
                        <p key={ability.ability.name}>{ability.ability.name}</p>
                    )
                })}
            </div>
        </div>
    )
}