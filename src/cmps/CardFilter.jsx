import { TextField, Autocomplete, Chip, Box,Button } from '@mui/material';
import { useState, useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { debounce } from '../services/util.service';
import CloseModal2 from '../assets/svgs/CloseModal2.svg?react'
import HeartFull from '../assets/svgs/HeartFull.svg?react'
import HeartEmpty from '../assets/svgs/HeartEmpty.svg?react'

export function CardFilter({ userAllTags, onSetMiniFilter, filterBy }) {
  const [searchValue, setSearchValue] = useState(filterBy.txt || '');
  const [selectedTags, setSelectedTags] = useState(filterBy.tags || [] );
  const hasInitialized = useRef(false);
  const [sortDir, setSortDir] = useState(filterBy.sortDir ?? -1)
  const [starOnly, setStarOnly] = useState(filterBy.starOnly ?? false);

  console.log(filterBy)

  onSetMiniFilter = useRef(debounce(onSetMiniFilter, 300));

  useEffect(() => {
    // prevent second refresh
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }

    onSetMiniFilter.current({ 
      txt: searchValue, 
      tags: selectedTags,
      starOnly: starOnly,
      sortDir :sortDir
      });
  }, [searchValue, selectedTags,sortDir,starOnly]);

  function toggleSortDir() {
    setSortDir(prev => (prev === 1 ? -1 : 1));
  }

  console.log(filterBy)

  return (
    <Box  className="card-filter" display="flex" flexWrap="wrap" gap={2} >
        <TextField
        label="Search links"
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
            endAdornment: searchValue && (
            <span
                style={{ cursor: 'pointer', fontWeight: 'bold', marginLeft: 4 }}
                onClick={() => setSearchValue('')}
            >
            <CloseModal2 className='close-modal'/>     
                
            </span>
            )
        }}
        />
      <Autocomplete
        multiple
        options={userAllTags}
        value={selectedTags}
        onChange={(e, newValue) => setSelectedTags(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} key={option} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Filter by Tags" size="small" />
        )}
        sx={{ minWidth: 200 }}
      />
      <div className='buttom-line-btns'>

          <div className="star-div" 
            onClick={() => setStarOnly(prev => !prev)} 
            style={{ cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}>
              <label>Liked links</label>
              {starOnly ? (
                <HeartFull className="star-toggle" />
              ) : (
                <HeartEmpty className="star-toggle" />
              )}
            
          </div>

          <div className='sort-div'>
            <label>Sort:</label>
            <Button
              className='sort-btn'
              variant="outlined"
              size="small"
              onClick={toggleSortDir}
              sx={{ textTransform: 'none' }}
            >
              {sortDir === 1 ? '⬆' : '⬇'}
            </Button>
          </div>

      </div>
  
    </Box>
  );
}
