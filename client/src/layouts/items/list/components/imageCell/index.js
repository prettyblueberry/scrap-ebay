/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


function ImageCell({ image, name }) {
  return (
    // <MDBox m={3} mt={2} mb={2}>
      <img src={image} alt={name}  style={{width:"100%", height: "auto"}}/>
    // </MDBox>
  );
}

// // Setting default value for the props of CustomerCell
// ImageCell.defaultProps = {
//   image: "",
//   color: "dark",
// };
//
// // Typechecking props for the CustomerCell
// ImageCell.propTypes = {
//   image: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   color: PropTypes.oneOf([
//     "transparent",
//     "primary",
//     "secondary",
//     "info",
//     "success",
//     "warning",
//     "error",
//     "light",
//     "dark",
//   ]),
// };

export default ImageCell;
