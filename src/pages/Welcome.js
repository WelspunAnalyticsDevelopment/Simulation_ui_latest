import React from 'react';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme
import 'primereact/resources/primereact.min.css';


export const Welcome = () => {
    const header = <h1 style={styles.headerText}>✨ Welcome to WelSell ✨</h1>;



    return (
        <div style={styles.container}>
            <Card style={styles.card} className="p-shadow-8">
                {header}
                <div style={styles.imageContainer}>
                    WelSell is a Saleplan Simulator, An attempt to automate the process of drafting a Saleplan involving Version Control , Authentication and Trends Analysis. 
                </div>
            </Card>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    },
    card: {
        width: '100%',
        maxWidth: '750px',
        textAlign: 'center',
        padding: '30px',
    },
    headerText: {
        marginTop : '-30px',
        fontSize: '3em',
        marginBottom: '20px',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    welcomeImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
}





