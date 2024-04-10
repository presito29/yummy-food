import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from "@mui/material";

export const AddressCard = ({item, showButton, handleSelectAddress}) => {
    
    return(
        
      <Card className="flex gap-5 w-80 p-5 rounded-lg shadow-lg bg-white">
      <HomeIcon className="text-4xl text-gray-500" />
       
          <div>
            <h1 className="font-semibold text-lg text-black">Home</h1>
            <p className="text-sm m-2 text-center">Nqkakuw adrress дкйфндм, хдфхидйфцд,йфдндм,фцд,йоднфдк</p>
            {showButton && (
              <Button
              fullWidth
                variant="outlined"
                className="text-sm text-black border-gray-500 hover:bg-gray-100"
                onClick={() => handleSelectAddress(item)}
              >
                Избери
              </Button>
            )}
          </div>
       
      </Card>
   
    )

}