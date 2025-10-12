import { Typography, Grid, Paper, Avatar, Rating } from "@mui/material";

const Testimony = (props) => {
  const key = props.index;
  const img = props.image;
  const name = props.name;
  const comment = props.comment;

  return (
    <Grid item key={key}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 8,
          maxHeight: 330,
          maxWidth: 280,
          p: 3,
          m: 1,
        }}
      >
        <Avatar
          alt="Sarah"
          src={img}
          sx={{ height: 64, width: 64, marginBottom: 2 }}
        />
        <Typography variant="subtitle2" fontWeight="bold">
          {name}
        </Typography>
        <Rating readOnly defaultValue={4} size="small" sx={{ m: 1 }} />
        <Typography variant="caption" sx={{ fontStyle: "italic", mt: 1 }}>
          {comment}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Testimony;
