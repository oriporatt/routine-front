import { useState, useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {  loadCards, updateCard,removeCard,loadAllUserTags } from '../store/actions/card.actions'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { cardService } from '../services/card/index'
// import { userService } from '../services/user'

 import { UPDATE_FILTER_BY } from "../store/reducers/card.reducer"; 
import { CardList } from '../cmps/CardList'
import {CardFilter} from '../cmps/CardFilter'
 //users:
//  import {  loadUsers } from '../store/actions/user.actions'



export function CardIndex() {

    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const userId = queryParams.get('user') ||''
    const cards =useSelector(storeState => storeState.cardModule.cards)
    const isLoading =useSelector(storeState => storeState.systemModule.isLoading)
    const  userIdToFilter={userId }
    const filterBy =useSelector(storeState => storeState.cardModule.filterBy)

    const userAllTags = useSelector(storeState => storeState.cardModule.allUserTags);

    
    function onSetMiniFilter(miniFilterByToEdit) {
    dispatch({
        type: UPDATE_FILTER_BY,
        filterBy: {
        ...filterBy,
        ...miniFilterByToEdit,
        userId  // ✅ use `userId` from query param, not from `filterBy`
        }
    });
    }


    useEffect(() => {
        dispatch({
            type: UPDATE_FILTER_BY,
            filterBy: userIdToFilter
        });
        
    }, [userId]) 




    useEffect(() => {
    if (filterBy.userId) {
        loadCards(filterBy);
        loadAllUserTags(userId)
    }
    }, [filterBy.userId, 
        filterBy.txt, 
        filterBy.sortDir,
        filterBy.starOnly,
        JSON.stringify(filterBy.tags)]);


        



    async function onRemoveCard(cardId) {
        try {
            await removeCard(cardId)
            toast.success("Link deleted",  { autoClose: 1000 });
        } catch (err) {
            // showErrorMsg('Cannot remove car')
        }
    }

    async function onAddCar() {
        const car = gigService.getEmptyCar()
        car.vendor = prompt('Vendor?')
        try {
            const savedCar = await addCar(car)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)

        } catch (err) {
            showErrorMsg('Cannot add car')
        }        
    }

    async function onUpdateCard(cardToSave,updateField) {
        try {
            const savedCard = await updateCard(cardToSave)
            if (updateField==='tags'){
                await loadAllUserTags(userId)
                toast.success("Updated tags",  { autoClose: 1000 });
            }
            if (updateField==='summary'){
                toast.success("Updated summary",  { autoClose: 1000 });
            }            
            if(updateField==='comment'){
                toast.success("Comment Updated",  { autoClose: 1000 });
            }

        } catch (err) {
            showErrorMsg('Cannot save')
        }        
    }



    
    return (
        <main className="cards-index">
            <CardFilter
                userAllTags={userAllTags}
                onSetMiniFilter={onSetMiniFilter}
                filterBy={filterBy}

            />
            {isLoading&& <h3>Loading links...</h3>}
            {!isLoading&&<div className='main-index'>
                {/* <GigFilter filterBy={filterBy} 
                onSetFilterBy={onSetFilterBy} 
                gigsLength={gigs.length} 
                /> */}

                 {cards&&<CardList  cards={cards} 
                    onUpdateCard={onUpdateCard}
                    onRemoveCard={onRemoveCard}
                    />}

            </div>}
                <>
                    <ToastContainer 
                        position="top-center"
                        closeOnClick
                        pauseOnHover
                        draggable
                        theme="colored" // or "light", "dark"
                        toastStyle={{ backgroundColor: '#4c8eaf', color: 'white' }} // global style
                    />
                </>
        </main>

    )
}