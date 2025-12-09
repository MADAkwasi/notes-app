export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  notes: {
    getUserNotes: "/notes/my-notes",
    handleNote: (id: string) => `/notes/${id}`,
    restoreNote: (id: string) => `/notes/${id}/restore`,
    getDeletedNotes: "/notes/my-notes/deleted",
    postNote: "/notes",
  },
};
