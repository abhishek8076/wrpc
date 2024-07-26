import React, { useState, useEffect } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import apiClient from '../../../Api/ApiClient';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { BASE_URL } from '../../../Api/ApiFunctions';

export const PerformanceList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/PerformanceIndices');
                const dataWithIds = response.data.map((row, index) => ({ id: index + 1, ...row }));
                setData(dataWithIds);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
        <div>
            <div>
                <TopHeader />
            </div>
            <CmsDisplay />
            <main>
        <div className="container mt-4">
            <h4>Performance Indices List</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Utility Name</th>
                        <th>Correct Operations</th>
                        <th>Unwanted Operations</th>
                        <th>Failures</th>
                        <th>Incorrect Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.utilityname}</td>
                            <td>{item.correct_operation}</td>
                            <td>{item.unwanted_operation}</td>
                            <td>{item.failures_operate}</td>
                            <td> {item.incorrect_operation ? (
                                    <a href={BASE_URL+item.filepath} target="_blank" rel="noopener noreferrer">
                                        {item.filepath}
                                    </a>
                                ) : (
                                    'No file'
                                )}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        <CmsFooter />
                </main>
            </div>

            </>
    );
};
