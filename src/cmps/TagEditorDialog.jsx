import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  Autocomplete
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cardService } from '../services/card';

export function TagEditorDialog({ open, onClose, initialTags = [], onSave }) {
  const [tags, setTags] = useState(initialTags);

  const cards = useSelector(storeState => storeState.cardModule.cards);

  // Gather suggested tags
  const allTags = cards.flatMap(card => card.linkTags || []);
  const combinedTags = [...allTags, ...cardService.ALLOWED_TAGS];
  const suggestedTags = [...new Set(combinedTags)];

  // Reset tags when dialog is opened
  useEffect(() => {
    if (open) setTags(initialTags);
  }, [open, initialTags]);

  function onChangeTags(event, newValue) {
    const uniqueTags = Array.from(
      new Set(
        newValue
          .map(tag => {
            if (typeof tag === 'string') return tag.trim();
            if (typeof tag === 'object' && tag.inputValue) return tag.inputValue.trim();
            return String(tag).trim();
          })
          .filter(Boolean)
      )
    );
    console.log(uniqueTags)
    setTags(uniqueTags);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableRestoreFocus>
      <DialogTitle>Edit Tags</DialogTitle>
      <DialogContent>
        <Autocomplete
          multiple
          freeSolo
          options={suggestedTags}
          value={tags}
          onChange={onChangeTags}
          filterOptions={(options, params) => {
            const filtered = options.filter(option =>
              option.toLowerCase().includes(params.inputValue.toLowerCase())
            );

            // Add manually typed value if it's not already in the list
            if (params.inputValue !== '' && !options.includes(params.inputValue)) {
            //   filtered.push(params.inputValue);
            // }
              filtered.push({
                inputValue: params.inputValue,
                label: `➕ Add new tag: "${params.inputValue}"`
              });
            }

            return filtered;
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={option}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Edit or Add Tags"
              placeholder="Add tag"
              sx={{ mt: 2 }}
            />
          )}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button variant="contained" onClick={() => {
          onSave(tags);
          onClose();
        }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
