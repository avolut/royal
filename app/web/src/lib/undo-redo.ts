import { useEffect } from "react";

const g = window as unknown as {
  undoRedo: Record<
    string,
    {
      update: (state: any) => void;
      history: { action: string; state: any; timestamp: number }[];
      cursor: number;
      on: {
        afterUndoRedo: () => void;
      };
    }
  >;
};

export const useUndoRedo = <T>(
  id: string,
  init?: {
    state: T;
    update: (a: T) => void;
    on: {
      loaded: () => void;
      afterUndoRedo: () => void;
    };
    deps: any[];
  }
) => {
  if (!g.undoRedo) {
    g.undoRedo = {};
  }

  if (!g.undoRedo[id]) {
    if (init) {
      g.undoRedo[id] = {
        update: init.update,
        on: init.on,
        history: [
          {
            action: "initial",
            state: init.state,
            timestamp: Date.now(),
          },
        ],
        cursor: 0,
      };
    } else {
      throw new Error(
        `Failed to load undo-redo for ${id}, state not initialized.`
      );
    }
  }

  const glb = g.undoRedo[id];

  if (init) {
    useEffect(() => {
      glb.history = [
        {
          action: "initial",
          state: init.state,
          timestamp: Date.now(),
        },
      ];
      glb.cursor = 0;
      init.on.loaded();
    }, init.deps);
  }

  return {
    undo() {
      if (this.can.undo) {
        glb.cursor = glb.cursor - 1;
        glb.update(this.current);
        glb.on.afterUndoRedo();
      }
    },
    reset(state: any) {
      glb.history = [
        {
          action: "initial",
          state: state,
          timestamp: Date.now(),
        },
      ];
      glb.cursor = 0;
    },
    redo() {
      if (this.can.redo) {
        glb.cursor = glb.cursor + 1;
        glb.update(this.current);
        glb.on.afterUndoRedo();
      }
    },
    get cursor() {
      return glb.cursor;
    },
    set cursor(e) {
      glb.cursor = e;
      glb.update(this.current);
      glb.on.afterUndoRedo();
    },
    get current() {
      return glb.history[glb.cursor].state as T;
    },
    updateRoot(state: any) {
      glb.update(state);
    },
    action(name: string, newState: T) {
      if (glb.cursor < glb.history.length - 1) {
        for (let index = 0; index < glb.history.length; index++) {
          if (index >= glb.cursor) {
            glb.history.pop();
          }
        }
        glb.cursor = glb.history.length - 1;
      }

      const last = glb.history[glb.history.length - 1];

      if (Date.now() - last.timestamp < 500) {
        glb.history[glb.history.length - 1] = {
          action: name,
          state: newState,
          timestamp: Date.now(),
        };
      } else {
        glb.history.push({
          action: name,
          state: newState,
          timestamp: Date.now(),
        });
        glb.cursor = glb.history.length - 1;
      }
      glb.update(glb.history[glb.cursor].state);
    },
    history: glb.history,
    can: {
      get undo() {
        return glb.history.length >= 1 && glb.cursor > 0;
      },
      get redo() {
        const historyLen = glb.history.length - 1;
        return glb.history.length >= 1 && glb.cursor < historyLen;
      },
    },
  };
};

const deepFreeze = (obj: any) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object" && !Object.isFrozen(obj[prop]))
      deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};
