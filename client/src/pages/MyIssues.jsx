import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/api';
import { Clock } from 'lucide-react';
import styles from './MyIssues.module.css';

function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    
    const getIssues = async () => {
      try {
        const res = await fetchWithAuth(`/issues/user/${user._id}`);
        if (res.ok) setIssues(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getIssues();
  }, []);

  if (loading) return <div className={styles['loading-state']}>Loading your issues...</div>;

  return (
    <div className={styles['my-issues-page']}>
      <header className={styles['header']}>
        <h1>My Reported Issues</h1>
        <p>Track the progress of the issues you've submitted.</p>
      </header>

      {issues.length === 0 ? (
        <div className={styles['empty-state']}>
          <p>You haven't reported any issues yet.</p>
        </div>
      ) : (
        <div className={styles['issues-grid']}>
          {issues.map(issue => (
            <div key={issue._id} className={styles['issue-card']}>
              <div className={styles['card-image']}>
                <img src={`http://localhost:3000/uploads/${issue.photo}`} alt={issue.title} />
                <span className={`${styles['status-badge']} ${styles['status-' + issue.status.replace(' ', '').toLowerCase()]}`}>
                  {issue.status}
                </span>
              </div>
              <div className={styles['card-content']}>
                <div className={styles['card-meta']}>
                  <span className={styles['category']}>{issue.category}</span>
                  <span className={styles['area']}>{issue.area}</span>
                </div>
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
                <div className={styles['card-footer']}>
                  <Clock size={14} />
                  <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyIssues;
