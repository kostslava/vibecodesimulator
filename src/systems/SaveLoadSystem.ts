import { SaveGame, useGameStore } from '../store/gameStore';

const SAVE_KEY_PREFIX = 'vibecodesim_save_';
const NUM_SAVE_SLOTS = 3;

export class SaveLoadSystem {
  static saveGame(slot: number): boolean {
    if (slot < 0 || slot >= NUM_SAVE_SLOTS) {
      console.error('Invalid save slot:', slot);
      return false;
    }
    
    try {
      const saveData = useGameStore.getState().getSaveData();
      const json = JSON.stringify(saveData);
      localStorage.setItem(`${SAVE_KEY_PREFIX}${slot}`, json);
      console.log(`Game saved to slot ${slot}`);
      return true;
    } catch (error) {
      console.error('Failed to save game:', error);
      return false;
    }
  }
  
  static loadGame(slot: number): boolean {
    if (slot < 0 || slot >= NUM_SAVE_SLOTS) {
      console.error('Invalid save slot:', slot);
      return false;
    }
    
    try {
      const json = localStorage.getItem(`${SAVE_KEY_PREFIX}${slot}`);
      if (!json) {
        console.warn('No save data in slot:', slot);
        return false;
      }
      
      const saveData: SaveGame = JSON.parse(json);
      useGameStore.getState().loadSave(saveData);
      console.log(`Game loaded from slot ${slot}`);
      return true;
    } catch (error) {
      console.error('Failed to load game:', error);
      return false;
    }
  }
  
  static getSaveInfo(slot: number): SaveGame | null {
    if (slot < 0 || slot >= NUM_SAVE_SLOTS) {
      return null;
    }
    
    try {
      const json = localStorage.getItem(`${SAVE_KEY_PREFIX}${slot}`);
      if (!json) {
        return null;
      }
      
      return JSON.parse(json);
    } catch (error) {
      console.error('Failed to get save info:', error);
      return null;
    }
  }
  
  static deleteSave(slot: number): boolean {
    if (slot < 0 || slot >= NUM_SAVE_SLOTS) {
      console.error('Invalid save slot:', slot);
      return false;
    }
    
    try {
      localStorage.removeItem(`${SAVE_KEY_PREFIX}${slot}`);
      console.log(`Save slot ${slot} deleted`);
      return true;
    } catch (error) {
      console.error('Failed to delete save:', error);
      return false;
    }
  }
  
  static exportSave(slot: number): string | null {
    const saveInfo = this.getSaveInfo(slot);
    if (!saveInfo) {
      return null;
    }
    
    return JSON.stringify(saveInfo, null, 2);
  }
  
  static importSave(json: string, slot: number): boolean {
    if (slot < 0 || slot >= NUM_SAVE_SLOTS) {
      console.error('Invalid save slot:', slot);
      return false;
    }
    
    try {
      const saveData: SaveGame = JSON.parse(json);
      localStorage.setItem(`${SAVE_KEY_PREFIX}${slot}`, JSON.stringify(saveData));
      console.log(`Save imported to slot ${slot}`);
      return true;
    } catch (error) {
      console.error('Failed to import save:', error);
      return false;
    }
  }
  
  static autoSave(): boolean {
    // Auto-save to a special slot
    try {
      const saveData = useGameStore.getState().getSaveData();
      const json = JSON.stringify(saveData);
      localStorage.setItem(`${SAVE_KEY_PREFIX}auto`, json);
      return true;
    } catch (error) {
      console.error('Auto-save failed:', error);
      return false;
    }
  }
  
  static loadAutoSave(): boolean {
    try {
      const json = localStorage.getItem(`${SAVE_KEY_PREFIX}auto`);
      if (!json) {
        return false;
      }
      
      const saveData: SaveGame = JSON.parse(json);
      useGameStore.getState().loadSave(saveData);
      return true;
    } catch (error) {
      console.error('Failed to load auto-save:', error);
      return false;
    }
  }
}
