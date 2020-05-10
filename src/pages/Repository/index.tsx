import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRouteMatch, Link } from 'react-router-dom';

import logoImgDark from '../../assets/logo-dark.svg';
import logoImg from '../../assets/logo.svg';
import { useTheme } from '../../hooks/theme';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);

  const [issues, setIssues] = useState<Issue[]>([]);

  const { theme } = useTheme();

  useEffect(() => {
    async function loadData(): Promise<void> {
      // eslint-disable-next-line no-shadow
      const [repository, issue] = await Promise.all([
        api.get<Repository>(`repos/${params.repository}`),
        api.get<Issue[]>(`repos/${params.repository}/issues`),
      ]);

      setRepository(repository.data);
      setIssues(issue.data);
    }

    loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img
          src={theme === 'light' ? logoImg : logoImgDark}
          alt="Github Explorer"
        />
        <Link to="/">
          <FiChevronLeft size={16} />
          Go back
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Open issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
