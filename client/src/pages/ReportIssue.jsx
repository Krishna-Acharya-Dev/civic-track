import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { fetchWithAuth } from '../utils/api';
import styles from './ReportIssue.module.css';

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Infrastructure', area: 'Mansarovar',
  });
  const [position, setPosition] = useState([26.9124, 75.7873]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return setError("Please upload a photo of the issue.");

    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('area', formData.area);
    data.append('coordinates', JSON.stringify(position));
    data.append('photo', photo);

    try {
      const res = await fetchWithAuth('/issues', { method: 'POST', body: data });
      if (!res.ok) throw new Error("Failed to report issue");
      navigate('/my-issues');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['report-page']}>
      <div className={styles['report-card']}>
        <h2>Report a Civic Issue</h2>
        <p className={styles['subtitle']}>Help us improve the community.</p>

        {error && <div className={styles['error-box']}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles['report-form']}>
          <div className={styles['form-group']}>
            <label>Title</label>
            <input type="text" name="title" required onChange={handleChange} placeholder="Brief description of the issue" />
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-group']}>
              <label>Category</label>
              <select name="category" onChange={handleChange}>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Water Security">Water Security</option>
                <option value="Electricity">Electricity</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles['form-group']}>
              <label>Area</label>
              <select name="area" onChange={handleChange}>
                <option value="Mansarovar">Mansarovar</option>
                <option value="Malviya Nagar">Malviya Nagar</option>
                <option value="Vaishali Nagar">Vaishali Nagar</option>
                <option value="C-Scheme">C-Scheme</option>
                <option value="Jhotwara">Jhotwara</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className={styles['form-group']}>
            <label>Description</label>
            <textarea name="description" required onChange={handleChange} rows="4" placeholder="Provide more details..."></textarea>
          </div>

          <div className={styles['form-group']}>
            <label>Photo Evidence</label>
            <input type="file" accept="image/*" required onChange={handleFileChange} className={styles['file-input']} />
          </div>

          <div className={styles['form-group']}>
            <label>Location (Click to mark pinpoint)</label>
            <div className={styles['map-picker']}>
              <MapContainer center={[26.9124, 75.7873]} zoom={12} scrollWheelZoom={true} className={styles['leaflet-map-root']}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles['submit-btn']}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;
