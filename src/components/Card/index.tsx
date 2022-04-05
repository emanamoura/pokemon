import { useEffect, useState } from "react"
import './style.scss';
import { api } from "../../services/api"
import { Abilities, IAbility } from "../Abilities";
import { Stat, Stats } from "../Stats";

interface CardProps {
    pokemonId: number;
}

interface ColorCard {
    [key: string]: string
}

const colorCard : ColorCard =  {
    green: '#77DD77',
    green_light: '#7ef07e',
    red: '#ca2533',
    red_light: '#ff2e40',
    blue: '#00dbff',
    blue_light: '#00ffff',
    white: '#eceaea',
    white_light: '#ffffff',
    brown: '#b37a4c',
    brown_light: '#cc9966',
    yellow: '#ffe12b',
    yellow_light: '#fcf4a3',
    purple: '#715295',
    purple_light: '#bca0dc',
    pink: '#fa82a7',
    pink_light: '#fcb4ca',
    gray: '#7f7d7c',
    gray_light: '#aaa9ab'

}

export function Card({ pokemonId }: CardProps) {

    const [pokemon, setPokemon] = useState('');
    const [pokemonImg, setPokemonImg] = useState('');
    const [weight, setWeight] = useState('');
    const [abilities, setAbilities] = useState<IAbility[]>([]);
    const [stats, setStats] = useState<Stat[]>([]);
    const [pokemonColor, setPokemonColor] = useState<string>('');

    useEffect(() => {
        api.get(`/pokemon/${pokemonId}`).then((response) => {
            console.log(response.data)
            setPokemon(response.data.name);
            setPokemonImg(response.data.sprites.front_default);
            setWeight(response.data.weight)
            setAbilities(response.data.abilities);
            setStats(response.data.stats);
            setPokemonColor(response.data.species.url.slice(42))
        })
    }, [])

    useEffect(() => {
        api.get(`/pokemon-species/${pokemonColor}`).then((response) => {
            setPokemonColor(response.data.color.name)
        })
    }, [pokemonColor])

    return (
        <>
            {pokemon ? (
                <section className="pokemon-card" style={{backgroundColor: colorCard[pokemonColor]}}>
                    <header style={{backgroundColor: colorCard[pokemonColor + '_light']}}>
                        <img src={pokemonImg} alt={pokemon} />
                        <div>
                            <p>{pokemon}</p>
                            <p>Weight: {weight}</p>
                        </div>
                    </header>
                    <main>  
                        <Abilities abilities={abilities} color={colorCard[pokemonColor + '_light']}/>
                        <Stats stats={stats} color={colorCard[pokemonColor + '_light']} />
                    </main>
                </section>
            ) : (
                <p></p>
            )}
        </>
    )

}