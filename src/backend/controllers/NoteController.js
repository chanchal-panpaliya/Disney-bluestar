import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getNotesHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }
        const { videoId } = request.params;
        const videoNotes = user.notes.filter((note) => note.videoId === videoId);
        return new Response(200, {}, { notes: videoNotes });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

export const addNoteHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }

        const { note } = JSON.parse(request.requestBody);

        const newNote = { _id: uuid(), ...note };
        user.notes.push(newNote);
        const videoNotes = user.notes.filter((each) => each.videoId === note.videoId);

        return new Response(201, {}, { notes: videoNotes });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

export const deleteNoteHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }

        const noteId = request.params.noteId;
        const filteredNotes = user.notes.filter((item) => item._id !== noteId);
        this.db.users.update({ notes: filteredNotes });

        return new Response(200, {}, { notes: filteredNotes });
    } catch (error) {
        return new Response(500, {}, { error });
    }
};

export const editNoteHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
        if (!user) {
            return new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }
        const noteId = request.params.noteId;
        const { note } = JSON.parse(request.requestBody);

        const updatedNotes = user.notes.map((item) => (item._id === noteId ? note : item));
        this.db.users.update({ notes: updatedNotes });
        return new Response(201, {}, { notes: updatedNotes });
    } catch (error) {
        return new Response(500, {}, { error });
    }
};