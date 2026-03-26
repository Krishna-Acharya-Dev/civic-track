import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/api';
import { ThumbsUp, MapPin, Clock } from 'lucide-react';
import styles from './Community.module.css';

function Community() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const uploadsUrl = import.meta.env.VITE_API_UPLOADS_URL || 'http://localhost:3000/uploads/';

  const fetchIssues = async () => {
    try {
      const res = await fetchWithAuth('/issues');
      if (res.ok) {
        const data = await res.json();
        data.sort((a, b) => b.votes.length - a.votes.length);
        setIssues(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleUpvote = async (issueId) => {
    try {
      const res = await fetchWithAuth(`/issues/${issueId}/upvote`, { method: 'PATCH' });
      if (res.ok) {
        fetchIssues();
      }
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  };

  if (loading) return <div className={styles['loading-state']}>Loading community issues...</div>;

  return (
    <div className={styles['community-page']}>
      <header className={styles['header']}>
        <h1>Community Issues</h1>
        <p>Support civic improvements by upvoting important issues.</p>
      </header>

      <div className={styles['issues-feed']}>
        {issues.map(issue => {
          const hasVoted = user && issue.votes.includes(user._id);
          
          return (
            <div key={issue._id} className={styles['issue-card']}>
              <div className={styles['vote-column']}>
                <button 
                  className={`${styles['upvote-btn']} ${hasVoted ? styles['voted'] : ''}`}
                  onClick={() => handleUpvote(issue._id)}
                  title={hasVoted ? "Remove Upvote" : "Upvote"}
                >
                  <ThumbsUp size={24} strokeWidth={hasVoted ? 3 : 2} />
                </button>
                <span className={styles['vote-count']}>{issue.votes.length}</span>
              </div>
              
              <div className={styles['card-content']}>
                <div className={styles['card-meta']}>
                  <span className={styles['category']}>{issue.category}</span>
                  <span className={`${styles['status-badge']} ${styles['status-' + issue.status.replace(' ', '').toLowerCase()]}`}>
                    {issue.status}
                  </span>
                </div>
                
                <h3 className={styles['title']}>{issue.title}</h3>
                <p className={styles['description']}>{issue.description}</p>
                
                {issue.photo && (
                   <img src={`${uploadsUrl}${issue.photo}`} alt={issue.title} className={styles['issue-image']} />
                )}

                <div className={styles['card-footer']}>
                  <div className={styles['footer-item']}>
                    <MapPin size={14} />
                    <span>{issue.area}</span>
                  </div>
                  <div className={styles['footer-item']}>
                    <Clock size={14} />
                    <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                  </div>
                  {issue.user && (
                    <div className={styles['reporter']}>
                      Reported by {issue.user.firstname} {issue.user.lastname}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {issues.length === 0 && <div className={styles['empty-state']}>No issues reported yet.</div>}
      </div>
    </div>
  );
}

export default Community;
