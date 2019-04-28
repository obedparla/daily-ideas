export const authModalStyles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  signUpEmail: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
  },
  facebook: {
    marginTop: theme.spacing.unit * 2,
    background: "#3a579a",
  },
  google: {
    marginTop: theme.spacing.unit * 2,
    background: "#4285F4",
  },
});
