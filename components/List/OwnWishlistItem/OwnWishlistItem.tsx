import { Flex, Text, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useDeletePresentMutation } from "../../../redux/services/christmasList"
import React from 'react'
import { Present } from '../../../pages/dashboard'

interface OwnWishlistItemProps {
    present: Present
  }
export const OwnWishlistItem = ({ present }: OwnWishlistItemProps) => {
    const [deletePresent, { isLoading: isDeleting, error: deletingError }] = useDeletePresentMutation()

    const handleDelete = async () => {
        await deletePresent(present._id)
    }

    return (
        <Flex align='center' justify='space-between' w='100%' h='35px' borderBottom='1px'>
        <Text as={'span'} color={'black'}>{present.description}</Text>
        <IconButton aria-label='delete present' size='sm' onClick={handleDelete} icon={<DeleteIcon />} />
        </Flex>
    )
}