import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        // zIndex: 1,
        // backgroundColor: "#fff",
        // boxShadow: 2,
        // width: 36,
        // height: 36,
        borderRadius: "50%",
        "&:hover": { backgroundColor: "grey.100" },
      }}
    >
      <ArrowForwardIosRoundedIcon fontSize="large" />
    </IconButton>
  );
};

export const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        // zIndex: 1,
        // backgroundColor: "#fff",
        // boxShadow: 2,
        // width: 36,
        // height: 36,
        borderRadius: "50%",
        "&:hover": { backgroundColor: "grey.100" },
      }}
    >
      <ArrowBackIosRoundedIcon fontSize="large" />
    </IconButton>
  );
};

const Features = (props) => {
  let img = props.image;
  let title = props.title;
  let body = props.description;

  return (
    <Box>
      <Card
        sx={{
          borderRadius: 5,
          maxWidth: 300,
          maxHeight: 450,
        }}
      >
        <CardMedia title="illustration" image={img} sx={{ height: 250 }} />
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} color="primary">
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              mt: 1,
            }}
          >
            {body}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Features;
