import {
  Typography,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const EmailHistoryItem = ({
  handleOpenReport,
  item,
  handleDeleteHistory,
  index,
}) => {
  return (
    <div>
      <ListItem
        alignItems="flex-start"
        style={{ cursor: 'pointer' }}
        onClick={(e) => handleOpenReport(e, item)}
      >
        <ListItemAvatar>
          <Avatar>
            <Edit />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item.subject}
          secondary={
            <Box component="span" display="flex" flexDirection="column">
              <Typography component="span" variant="body2" color="textPrimary">
                {item.email}
              </Typography>
              <div style={{ display: 'flex' }}>
                {item.type.map((tp, index) => (
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    {`${tp}`}
                  </Typography>
                ))}
              </div>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {new Date(item.date).toLocaleString()}
              </Typography>
            </Box>
          }
        />
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteHistory(index)}
        >
          <Delete />
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};
export default EmailHistoryItem;
