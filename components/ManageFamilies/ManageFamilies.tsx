import { Box } from "@chakra-ui/react"
import React from "react"
import { Family } from "../../pages/dashboard"
import { AddFamilySection } from "./AddFamilySection"
import { CreateFamilySection } from "./CreateFamilySection"
import { DeleteFamilySection } from "./DeleteFamilySection"

interface ManageFamilyProps {
    families?: Family[]
}
export const ManageFamilies = ({ families }: ManageFamilyProps) => {
    return (
        <Box borderWidth='2px' p='20px' borderRadius='10px'>
            <AddFamilySection />
            <CreateFamilySection />
            <DeleteFamilySection families={families} />
        </Box>
    )
}