import { useState } from 'react';
import {
    Box,
    Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const endpointMapping = {
    'Notion': 'notion',
    'Airtable': 'airtable',
    'HubSpot': 'hubspot'
};

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'type', headerName: 'Type' },
    { field: 'directory', headerName: 'Directory' },
    { field: 'parent_path_or_name', headerName: 'Parent Path or Name' },
    { field: 'parent_id', headerName: 'Parent ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'creation_time', headerName: 'Creation Time' },
    { field: 'last_modified_time', headerName: 'Last Modified Time' },
    { field: 'url', headerName: 'URL' },
    { field: 'children', headerName: 'Children' },
    { field: 'mime_type', headerName: 'MIME Type' },
    { field: 'delta', headerName: 'Delta' },
    { field: 'drive_id', headerName: 'Drive ID' },
    { field: 'visibility', headerName: 'Visibility' },
];

export const DataForm = ({ integrationType, credentials }) => {
    const [loadedData, setLoadedData] = useState(null);
    const endpoint = endpointMapping[integrationType];

    const handleLoad = async () => {
        try {
            const formData = new FormData();
            formData.append('credentials', JSON.stringify(credentials));
            const response = await axios.post(`http://localhost:8000/integrations/${endpoint}/load`, formData);
            const data = response.data;
            setLoadedData(data);
        } catch (e) {
            alert(e?.response?.data?.detail);
        }
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' width='100%'>
            <Box display='flex' alignItems='center' flexDirection='column' width='100%'>
                <Button
                    onClick={handleLoad}
                    sx={{mt: 2}}
                    variant='contained'
                >
                    Load Data
                </Button>
                <Button
                    onClick={() => setLoadedData(null)}
                    sx={{mt: 1, mb: 2}}
                    variant='contained'
                >
                    Clear Data
                </Button>
            </Box>
            {loadedData?.length > 0 && <DataGrid rows={loadedData} columns={columns} pageSize={5} />}
        </Box>
    );
}
