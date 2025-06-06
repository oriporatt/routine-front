import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect,useRef } from 'react'
import {
    Dialog ,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
    Button ,
    InputAdornment
} from '@mui/material';
import { TagEditorDialog } from './TagEditorDialog';
import dayjs from 'dayjs'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Msg from '../assets/svgs/Msg.svg?react'
import Markvv from '../assets/svgs/Markvv.svg?react'
import EditTag from '../assets/svgs/EditTag.svg?react'
import Delete from '../assets/svgs/Delete.svg?react'
import HeartEmpty from '../assets/svgs/HeartEmpty.svg?react'
import HeartFull from '../assets/svgs/HeartFull.svg?react'
import CopyLink from '../assets/svgs/CopyLink.svg?react'

import Share from '../assets/svgs/Share.svg?react'
import Details from '../assets/svgs/Details.svg?react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CardPreview({ card ,onUpdateCard,onRemoveCard}) {
    const navigate = useNavigate();
    const emptyImg="https://res.cloudinary.com/deue4rbta/image/upload/w_1280,h_720,c_fit/v1747766404/emptyIMG_ibe8m5.png"
    const imageURL = card.imgLink || emptyImg
    const [msgExpanded, setMsgExpanded] = useState(false);

    function toggleAccordion(){
        setMsgExpanded(prev=>!prev)
    }


    const [isEditing, setIsEditing] = useState(false);


    const [summary, setSummary] = useState(card.summary);

    const hasChanges = summary !== card.summary

    
    //tags::
    const [tagDialogOpen, setTagDialogOpen] = useState(false);
    const [tags, setTags] = useState(card.linkTags || []);
    
    async function  handleSaveTags(updatedTags)  {
        try {
            setTags(updatedTags);
            
            // Optional: update card locally
            const updatedCard = { ...card, linkTags: updatedTags };

            // Optional: call backend or Redux action
            await onUpdateCard(updatedCard,'tags') // 🔁 replace with your actual update method

            // Optional: update UI or global state (e.g. re-fetch cards or dispatch)
            // dispatch({ type: UPDATE_CARD, card: updatedCard });

            setTagDialogOpen(false);
        } catch (err) {
            console.error('Failed to update tags:', err);
        }
    };
    



    async function handleStarChange(newStar)  {
        try {

            const updatedCard = { ...card, star: newStar };
            await onUpdateCard(updatedCard,'star') // 🔁 replace with your actual update method

        } catch (err) {
            console.error('Failed to update tags:', err);
        }
    };

    
    async function handleSummaryChange() {
        try {
            const updatedCard = { ...card, summary: summary };
            await onUpdateCard(updatedCard,'summary') // 🔁 replace with your actual update method

        } catch (err) {
            console.error('Failed to update summary:', err);
        }
    }

    

    function handleNativeShare() {
        if (navigator.share) {
            navigator.share({
            title: card.summary,
            // text: card.originalMsg,
            url: card.linkURL,
            })
            .then(() => console.log('✅ Shared successfully'))
            .catch((error) => console.error('❌ Share failed:', error));
        } else {
            alert('Sharing is not supported on this browser.'); // fallback
        }
    }
    //delete dialog:
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    function handleConfirmDelete() {
        onRemoveCard(card._id)
        setIsDeleteDialogOpen(false); // close dialog
    }

    function isHebrew(text) {
        return /[\u0590-\u05FF]/.test(text)
    }

    // comment dialod

    const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
    const [commentValue, setCommentValue] = useState(card.comment || '');

    function openCommentDialog() {
        setCommentValue(card.comment || '');
        setIsCommentDialogOpen(true);
    }

    async function handleSaveComment() {
        try {
            const updatedCard = { ...card, comment: commentValue };
            await onUpdateCard(updatedCard, 'comment');
            setIsCommentDialogOpen(false);
        } catch (err) {
            console.error('❌ Failed to save comment:', err);
        }
    }

    return (
        <article className="card-preview">
            <header className='card-header'>
                <img className={emptyImg===imageURL? 'card-img empty':'card-img'} src={imageURL}/>

                <div style={{ position: 'relative', width: '100%' }}>
                    <TextField
                        className="summary-card"
                        multiline
                        minRows={6}
                        maxRows={6}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        size="small"
                        variant="outlined"
                        InputProps={{
                        sx: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: '1.1',
                            direction: isHebrew(summary) ? 'rtl' : 'ltr',
                            '& fieldset': {
                            border: 'none',
                            },
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            borderRadius: '10px',
                        }
                        }}
                    />

                    {!hasChanges && (
                        <span style={{
                        position: 'absolute',
                        bottom: '8px',         // adjust to appear inside input
                        left: '16px',
                        fontSize: '11px',
                        color: '#888',
                        pointerEvents: 'none'   // so it doesn’t block clicks
                        }}>
                        Edit text...
                        </span>
                    )}

                    {hasChanges && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: '7px',     // adjust as needed to fit inside
                                ...(isHebrew(summary) ? { left: '20px' } : { right: '20px' }),
                                fontSize: '12px',
                                padding: '2px 12px',
                                height: '24px',
                                minWidth: 'unset',
                                textTransform: 'none',
                                zIndex: 1
                            }}
                            onClick={handleSummaryChange}
                        >
                                Save
                        </Button>
                    )}
                </div>
            </header>

            <div className='link-details'>
                <div className='chip-tags'>
                    {card.linkTags?.map((tag, idx) => (
                        <Chip
                        key={idx}
                        label={tag}
                        variant="outlined"
                        size="small"
                        color="primary"
                        // onDelete={()=>console.log('delete')}
                        />
                    ))}
                        
                </div>
                
                
                <div>
                    <Button
                        className="edit-tags-btn"
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => setTagDialogOpen(true)}
                        sx={{ textTransform: 'none' }} // 👈 disables uppercase

                        >
                        <EditTag className='edit-tag'/>Edit Tags 
                    </Button>

                    <TagEditorDialog
                    open={tagDialogOpen}
                    onClose={() => setTagDialogOpen(false)}
                    initialTags={tags}
                    onSave={handleSaveTags}
                    
                    />
                </div>

                <h6>{dayjs(card.msgSentAt).format('DD MMM YYYY, HH:mm')}</h6>
            </div>           
            
            <div className='accordion-container'>
                <Accordion  expanded={msgExpanded} onChange={toggleAccordion} >
                <AccordionSummary 
                    className='accordion-summary'
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                        <Msg className='msg-svg'/>
                        <p>Full WhatsApp message</p>
                        
                    
                </AccordionSummary>
                <AccordionDetails className='accordion-details' onClick={() => toggleAccordion()}
                >
                    <p className='full-msg' >{card.originalMsg}</p>
                    <p className='time-label'>{dayjs(card.msgSentAt).format('DD MMM YYYY, HH:mm')}<span><Markvv/></span></p>
                </AccordionDetails>
                </Accordion>
            </div>


            <div className='buttons-bottom'>
                {!card.star&&<HeartEmpty className='like-empty' onClick={()=>handleStarChange(true)}/>}
                {card.star&&<HeartFull className='like-full' onClick={()=>handleStarChange(false)}/>}
                <div className='details-div'>
                    <Details className="details-btn" onClick={openCommentDialog} style={{ cursor: 'pointer' }} />
                    {card.comment&&<span className='dot'></span>}
                </div>
                <Dialog
                open={isCommentDialogOpen}
                onClose={() => setIsCommentDialogOpen(false)}
                fullWidth
                maxWidth="sm"
                >
                <DialogTitle>My Comment</DialogTitle>
                    <DialogContent>
                        <TextField
                        label="Comment"
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                        multiline
                        minRows={4}
                        fullWidth
                        autoFocus
                        sx={{ mt: 1 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveComment} variant="contained">Save</Button>
                    </DialogActions>
                </Dialog>


                <CopyLink
                className="copy-link-btn"
                onClick={() => {
                    if (!card.linkURL) return;
                    navigator.clipboard.writeText(card.linkURL)
                    .then(() => {
                        toast.success("Link Copied",  { autoClose: 1000 });
                    })
                    .catch(err => {
                        console.error('Error', err);
                    });
                }}/>
                <Share className="share-btn" onClick={handleNativeShare}/>
                <Delete   onClick={() => setIsDeleteDialogOpen(true)} className="delete-svg" />
                <Dialog
                    open={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    >
                    {/* <DialogTitle>Confirm Deletion</DialogTitle> */}
                    <DialogContent>
                        Are you sure you want to delete this Link?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
                        Cancel
                        </Button>
                        <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                        >
                        Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>

            <a
                href={card.linkURL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-link"
                >
                Open Link
            </a>    

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
    </article>
    );
}
