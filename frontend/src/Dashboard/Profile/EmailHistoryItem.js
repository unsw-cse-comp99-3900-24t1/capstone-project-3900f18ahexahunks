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
import { Link } from 'react-router-dom';

const EmailHistoryItem = ({
  handleOpenReport,
  item,
  handleDeleteHistory,
  index,
}) => {
  console.log(item, 'ITEMS');
  return (
    <div>
      <ListItem
        alignItems="flex-start"
        style={{ cursor: 'pointer' }}
        // onClick={(e) => handleOpenReport(e, item)}
      >
        <ListItemAvatar>
          <Avatar>
            <Edit />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Send to: ${item.email}`}
          secondary={
            <Box component="span" display="flex" flexDirection="column">
              <Typography component="span" variant="body2" color="textPrimary">
                Subject: {item.subject}
              </Typography>
              <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  Files Sent:
                </Typography>
                {item.fileTypes.map((tp, index) => (
                  <div key={index} style={{}}>
                    <Link
                      to={`http://localhost:3000/handle-files/${item.process}/${tp}/${item.sharedObjId}`}
                      // target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      color="primary"
                    >
                      {tp.toUpperCase()}
                    </Link>
                  </div>
                ))}
              </div>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                Sent On: {new Date(item.date).toLocaleString()}
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
