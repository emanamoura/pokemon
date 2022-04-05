import './style.scss';

export interface Stat {
    base_stat: number;
    stat : {
        name: string;
    }
}

interface StatsProps {
    stats : Stat[]
    color: string;
}

export function Stats({ stats, color } : StatsProps) {
    return(
        <div className='status' style={{backgroundColor: color}}>
            <p>Stats</p>
            {stats.map(stat => {
                return (
                    <div className='status_content' key={stat.stat.name}>
                        <p >{stat.stat.name}</p>
                        <p>{stat.base_stat}</p>
                    </div>          
                )
            })}
        </div>
    )
}