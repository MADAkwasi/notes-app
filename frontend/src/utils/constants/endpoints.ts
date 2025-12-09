export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  notes: {
    getUserNotes: "/notes/my-notes",
    getNoteById: (id: string) => `/notes/${id}`,
    getDeletedNotes: "/notes/my-notes/deleted",
    postNote: "/notes",
  },
};
