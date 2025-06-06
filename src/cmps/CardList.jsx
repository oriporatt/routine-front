
import { CardPreview } from './CardPreview'

export function CardList({ cards,onUpdateCard,onRemoveCard}) {
    


    return <section>
        <ul className="card-list">
            {cards.map(card =>
                <li key={card._id}>
                    <CardPreview card={card} 
                    onUpdateCard={onUpdateCard}
                    onRemoveCard={onRemoveCard}
                    /></li>)}
                    {/* {shouldShowActionBtns(car) && <div className="actions">
                        <button onClick={() => onUpdateCar(car)}>Edit</button>
                        <button onClick={() => onRemoveCar(car._id)}>x</button>
                    </div>} */}
                
        
        </ul>
    </section>
}