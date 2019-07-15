const initialRows=([
    // Tree View Object 
    { id: "1", Name: "Rachel", Gender:"female", Age:24, Homeland:"New York", Grade:90 },
    { id: "2", Name: "Ross", Gender:"male", Age:27, Homeland:"California", Grade:85 },
    { id: "3", Name: "Sylvanas", Gender:"female", Age:28, Homeland:"Tokyo", Grade:100 },
    { id: "4", Name: "Alarak", Gender:"male", Age:25, Homeland:"Chicago", Grade:95 },
    { id: "5", Name: "Tracer", Gender:"female", Age:23, Homeland:"Washington DC", Grade:90 },
    { id: "6", Name: "Monica", Gender:"female", Age:18, Homeland:"Washington DC", Grade:89, parentId: "1" },
    { id: "7", Name: "Dva", Gender:"female", Age:20, Homeland:"Las Vegas", Grade:83, parentId: "1" },
    { id: "8", Name: "Chandler", Gender:"male", Age:10, Homeland:"Las Vegas", Grade:90, parentId: "6" },
    { id: "8", Name: "Tyrande", Gender:"female", Age:17, Homeland:"tokyo", Grade:90, parentId: "3" },
  ]);
export default initialRows;