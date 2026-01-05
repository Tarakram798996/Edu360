import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
const GlassTable = ({
  title,
  headers,
  data,
  searchValue,
  onSearch,
  renderRow,
}) => (
  <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-5">
    <h2 className="text-2xl font-bold mb-3 text-center text-gray-900">
      {title}
    </h2>

    <input
      type="text"
      placeholder={`Search ${title.toLowerCase()}...`}
      value={searchValue}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full mb-4 px-4 py-2 rounded-xl bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
    />

    <div className="overflow-x-auto max-h-[420px] rounded-xl">
      <table className="w-full text-sm text-gray-800">
        <thead className="sticky top-0 bg-white/40 backdrop-blur-lg">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-3 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-6">
                No records found
              </td>
            </tr>
          ) : (
            data.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const RemoveUser = () => {
  const { token } = useAuth();

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');

  const [message, setMessage] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/admin/getAllUsers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStudents(data[0] || []);
      setTeachers(data[1] || []);
    } catch {
      setMessage('❌ Failed to load users');
    }
  };

  const requestDelete = (type, id, name) => {
    setDeleteTarget({ type, id, name });
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const { type, id } = deleteTarget;

    try {
      const res = await fetch(
        `http://localhost:8080/admin/delete${type}/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setMessage(`✅ ${type} deleted successfully`);
        fetchUsers();
      } else {
        setMessage(`❌ Failed to delete ${type}`);
      }
    } catch {
      setMessage('❌ Server error');
    } finally {
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const filteredStudents = students.filter((s) => {
    const q = studentSearch.toLowerCase();
    return (
      s.fullName?.toLowerCase().includes(q) ||
      s.regNo?.toLowerCase().includes(q) ||
      s.dept?.toLowerCase().includes(q) ||
      s.user?.email?.toLowerCase().includes(q)
    );
  });

  const filteredTeachers = teachers.filter((t) => {
    const q = teacherSearch.toLowerCase();
    return (
      t.fullName?.toLowerCase().includes(q) ||
      t.dept?.toLowerCase().includes(q) ||
      t.user?.email?.toLowerCase().includes(q)
    );
  });

    return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
        Manage Students & Teachers
      </h1>

      {message && (
        <p className="mb-6 text-center font-medium text-gray-700">
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* STUDENTS */}
        <GlassTable
          title="Students"
          headers={['ID', 'Name', 'Reg No', 'Dept', 'Sec', 'Year', 'Email', '']}
          data={filteredStudents}
          searchValue={studentSearch}
          onSearch={setStudentSearch}
          renderRow={(s) => (
            <tr key={s.id} className="hover:bg-white/30 transition">
              <td className="px-3 py-2">{s.id}</td>
              <td className="px-3 py-2 font-medium">{s.fullName}</td>
              <td className="px-3 py-2">{s.regNo}</td>
              <td className="px-3 py-2">{s.dept}</td>
              <td className="px-3 py-2">{s.sec}</td>
              <td className="px-3 py-2">{s.year}</td>
              <td className="px-3 py-2">{s.user?.email}</td>
              <td className="px-3 py-2 text-right">
                <button
                  onClick={() =>
                    requestDelete('Student', s.id, s.fullName)
                  }
                  className="px-3 py-1 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition shadow"
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />

        {/* TEACHERS */}
        <GlassTable
          title="Teachers"
          headers={['ID', 'Name', 'Dept', 'Sec', 'Year', 'Email', '']}
          data={filteredTeachers}
          searchValue={teacherSearch}
          onSearch={setTeacherSearch}
          renderRow={(t) => (
            <tr key={t.id} className="hover:bg-white/30 transition">
              <td className="px-3 py-2">{t.id}</td>
              <td className="px-3 py-2 font-medium">{t.fullName}</td>
              <td className="px-3 py-2">{t.dept}</td>
              <td className="px-3 py-2">{t.sec}</td>
              <td className="px-3 py-2">{t.year}</td>
              <td className="px-3 py-2">{t.user?.email}</td>
              <td className="px-3 py-2 text-right">
                <button
                  onClick={() =>
                    requestDelete('Teacher', t.id, t.fullName)
                  }
                  className="px-3 py-1 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition shadow"
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />
      </div>

      {/* CONFIRM DIALOG */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              Confirm Deletion
            </h3>

            <p className="text-center text-gray-700 mb-6 leading-relaxed">
              You are about to permanently delete
              <span className="font-semibold text-gray-900">
                {' '}{deleteTarget?.name}
              </span>
              <span className="text-gray-500">
                {' '}({deleteTarget?.type})
              </span>.
              <br />
              <span className="text-red-600 font-medium">
                This action cannot be undone.
              </span>
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveUser;
