import { Box, Button, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const socialItem = [
    { name: "Twitter", icon: <Twitter />, url: "//twitter.com" },
    { name: "Facebook", icon: <Facebook />, url: "//facebook.com" },
    { name: "Instagram", icon: <Instagram />, url: "//instagram.com" },
    { name: "LinkedIn", icon: <LinkedIn />, url: "//linkedin.com" },
  ];

  return (
    <Box className="footer" component="footer">
      <Box>
        {socialItem.map((item, index) => (
          <Button
            key={index}
            component="a"
            href={item.url}
            target="_blank"
            size="small"
            variant="outlined"
            color="inherit"
            sx={{ color: "white", m: 1, borderRadius: "50%" }}
          >
            {item.icon}
          </Button>
        ))}
      </Box>
      <Typography variant="subtitle1" color="white" sx={{ mt: 1 }}>
        © Coffee Shop ED. All Rights Reserved.
      </Typography>
      <Typography variant="subtitle1" color="white">
        Designed by <strong>Edi G</strong>
      </Typography>
    </Box>
  );
};

export default Footer;
