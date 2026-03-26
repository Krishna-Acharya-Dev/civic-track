import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchWithAuth } from '../utils/api';
import styles from './MapBrowser.module.css';

function MapBrowser() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getIssues = async () => {
      try {
        const res = await fetchWithAuth('/issues');
        if (res.ok) {
          const data = await res.json();
          setIssues(data);
        }
      } catch (error) {
        console.error("Failed to load issues", error);
      } finally {
        setLoading(false);
      }
    };
    getIssues();
  }, []);

  return (
    <div className={styles['map-page']}>
      <div className={styles['map-header']}>
        <h1>Civic Issues Map</h1>
        <p>Explore reports submitted by the community.</p>
      </div>
      <div className={styles['map-container-wrapper']}>
        {loading ? (
          <div className={styles['loading-state']}>Loading map data...</div>
        ) : (
          <MapContainer 
            center={[40.7128, -74.0060]} 
            zoom={12} 
            scrollWheelZoom={true} 
            className={styles['leaflet-map-root']}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {issues.map((issue) => (
              issue.coordinates && issue.coordinates.length === 2 && (
                <Marker key={issue._id} position={[issue.coordinates[0], issue.coordinates[1]]}>
                  <Popup>
                    <div className={styles['issue-popup']}>
                      <h3>{issue.title}</h3>
                      <p className={styles['category']}>{issue.category}</p>
                      <p className={styles['status']} data-status={issue.status}>{issue.status}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default MapBrowser;
