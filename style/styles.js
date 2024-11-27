import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  h1:
  {
fontSize:20,
alignItems:"center",
  },
   // Styling for the login image
   image: {
    width: '80%',  // Image width takes 80% of the container's width
    height: '75%',  // Image height is set to 80% of the container's height
    resizeMode: 'contain',  // Ensures image maintains aspect ratio
  },
  buttonContainer: {
    width: '10%',
  backgroundColor:'yellow',
    marginTop: 20,  // Space between button and other elements
  },

  //loginscreen
  // The wrapper to hold everything in a row layout
  wrapper1: {
    flexDirection: 'row',  // Align elements in a row (image and form)
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Content container that holds the form and image side by side
  contentContainer1: {
    flexDirection: 'row',  // Row layout for form and image
    width: '100%',
    height: '80%', // Occupy 80% of the screen height
    alignItems: 'center',
    justifyContent: 'center',
    width:'50%',
  },


  // Form Box styles
  formBox1: {
  
    flex: 1,  // Takes half of the available space (right side)
    backgroundColor: '#fd9d3e',  // Light orange background for the form
    padding: 20,
  
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Image Box styles
  imageBox1: {
    flex: 1,  // Takes half of the available space (left side)
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white",
    width:'100%',
    height: '100%',  // Ensure the image container takes up the full height of the screen
  },
  image1: {
    width: '80%',  // Image width takes 80% of the container's width
    height: '80%',  // Image height is set to 80% of the container's height
    resizeMode: 'contain',  // Ensures image maintains aspect ratio
  },
 

  // Input fields
  input1: {
    width: '100%', 
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },

  // Title text (Login Header)
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },

  // Input container styling
  inputBox1: {
    position: 'relative',
    width: '100%',  // Full width of the container
    height:'100%',
       marginVertical: 10,  // Space between fields
  },

  // Register Link Text
  registerLink1: {
    marginTop: 20,
    textAlign: 'center',
  },

  // Style for the text inside the register link
  registerText1: {
    color: '#fff',
  },

  // Register clickable text style
  register1: {
    color: '#000',
    fontWeight: 'bold',
  },

  // Icon styling inside input fields
  icon1: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  // Button container for login
  buttonContainer1: {
    width: '100%',
    marginTop: 20,  // Space between button and other elements
  },


  //register style

  wrapper2: {
    flexDirection: 'row',  // Align elements in a row (image and form)
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Content container that holds the form and image side by side
  contentContainer2: {
    flexDirection: 'row',  // Row layout for form and image
    width: '100%',
    height: '80%', // Occupy 80% of the screen height
    alignItems: 'center',
    justifyContent: 'center',
    width:'50%',
  },

  // Form Box styles
  formBox2: {
  
    flex: 1,  // Takes half of the available space (right side)
    backgroundColor: '#fd9d3e',  // Light orange background for the form
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Image Box styles
  imageBox2: {
    flex: 1,  // Takes half of the available space (left side)
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white",
    width:'100%',
    height: '76%',  // Ensure the image container takes up the full height of the screen
  },
  image2: {
    width: '80%',  // Image width takes 80% of the container's width
    height: '80%',  // Image height is set to 80% of the container's height
    resizeMode: 'contain',  // Ensures image maintains aspect ratio
  },
 

  // Input fields
  input2: {
    width: '100%', 
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },

  // Title text (Login Header)
  title2: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },

  // Input container styling
  inputBox2: {
    position: 'relative',
    width: '100%',  // Full width of the container
    height:'100%',
       marginVertical: 10,  // Space between fields
  },

  // Register Link Text
  registerLink2: {
    marginTop: 20,
    textAlign: 'center',
  },

  // Style for the text inside the register link
  registerText2: {
    color: '#fff',
  },

  // Register clickable text style
  register2: {
    color: '#000',
    fontWeight: 'bold',
  },

  // Icon styling inside input fields
  icon2: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  // Button container for login
  buttonContainer2: {
    width: '100%',
    marginTop: 20,  // Space between button and other elements
  },
});

export default styles;
