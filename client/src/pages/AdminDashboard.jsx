import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/api';
import { Trash2, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import styles from './AdminDashboard.module.css';

function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAdmin) {
      navigate('/auth');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, issuesRes] = await Promise.all([
        fetchWithAuth('/stats'),
        fetchWithAuth('/issues')
      ]);

      if (statsRes.ok && issuesRes.ok) {
        setStats(await statsRes.json());
        setIssues(await issuesRes.json());
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetchWithAuth(`/issues/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        loadData(); // Reload data to update stats and table
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    try {
      const res = await fetchWithAuth(`/issues/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles['loading-state']}>Loading dashboard...</div>;

  return (
    <div className={styles['dashboard-page']}>
      <header className={styles['dashboard-header']}>
        <h1>Admin Control Center</h1>
        <p>Manage civic issues and monitor community statistics</p>
      </header>

      <section className={styles['stats-grid']}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles['stat-card']}>
            <h3>{stat.area || 'Unknown Area'}</h3>
            <div className={styles['stat-numbers']}>
              <div className={`${styles['stat-item']} ${styles['total']}`}>
                <Activity size={20} />
                <span>{stat.totalIssues} Total</span>
              </div>
              <div className={`${styles['stat-item']} ${styles['pending']}`}>
                <AlertCircle size={20} />
                <span>{stat.pendingIssues} Pending</span>
              </div>
              <div className={`${styles['stat-item']} ${styles['resolved']}`}>
                <CheckCircle size={20} />
                <span>{stat.resolvedIssues} Resolved</span>
              </div>
            </div>
          </div>
        ))}
        {stats.length === 0 && <div className={styles['no-data']}>No statistics available.</div>}
      </section>

      <section className={styles['issues-management']}>
        <h2>Recent Issues</h2>
        <div className={styles['table-container']}>
          <table className={styles['issues-table']}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Area</th>
                <th>Status</th>
                <th>Reporter</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(issue => (
                <tr key={issue._id}>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{issue.area}</td>
                  <td>
                    <select 
                      className={`${styles['status-select']} ${styles['status-' + issue.status.replace(' ', '').toLowerCase()]}`}
                      value={issue.status}
                      onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td>{issue.user ? `${issue.user.firstname} ${issue.user.lastname}` : 'Unknown'}</td>
                  <td>
                    <button className={styles['delete-btn']} onClick={() => handleDelete(issue._id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {issues.length === 0 && (
                <tr>
                  <td colSpan="6" className={styles['no-data']}>No issues reported yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
