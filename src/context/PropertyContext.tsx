import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Property, ConsultantProfile, HomeConfig } from '../types';
import { INITIAL_PROPERTIES } from '../data/listings';
import { CONSULTANT_INFO } from '../data/consultant';
import { INITIAL_HOME_CONFIG } from '../data/homeConfig';

interface PropertyContextType {
  // Data
  properties: Property[];
  consultant: ConsultantProfile;
  homeConfig: HomeConfig;
  
  // Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  
  // Admin Operations
  addProperty: (property: Omit<Property, 'id'>) => Property;
  updateProperty: (id: string, updated: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  togglePropertySold: (id: string) => void;
  updateConsultant: (updated: Partial<ConsultantProfile>) => void;
  updateHomeConfig: (updated: Partial<HomeConfig>) => void;
  resetToDefaultData: () => void;
  
  // Quick Queries
  soldProperties: Property[];
  unsoldProperties: Property[];
  propertiesByDistrict: (district: string) => Property[];
  districtsList: string[];
  totalAssetValue: number;
  totalSoldValue: number;
  totalActiveValue: number;
}

const STORAGE_KEY_PROPERTIES = 'zahrani_admin_properties_v2';
const STORAGE_KEY_CONSULTANT = 'zahrani_admin_consultant_v2';
const STORAGE_KEY_HOME = 'zahrani_admin_home_v2';
const STORAGE_KEY_AUTH = 'zahrani_admin_session_auth';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Properties State
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROPERTIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PROPERTIES;
  });

  // 2. Consultant Profile State
  const [consultant, setConsultant] = useState<ConsultantProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONSULTANT);
      if (saved) {
        return { ...CONSULTANT_INFO, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return CONSULTANT_INFO;
  });

  // 3. Home Config State
  const [homeConfig, setHomeConfig] = useState<HomeConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HOME);
      if (saved) {
        return { ...INITIAL_HOME_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return INITIAL_HOME_CONFIG;
  });

  // 4. Admin Auth State (Password: Bismillah99)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true' || 
             localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.warn('Failed to save properties to localStorage', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONSULTANT, JSON.stringify(consultant));
    } catch (e) {
      console.warn('Failed to save consultant to localStorage', e);
    }
  }, [consultant]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HOME, JSON.stringify(homeConfig));
    } catch (e) {
      console.warn('Failed to save homeConfig to localStorage', e);
    }
  }, [homeConfig]);

  // Auth Functions
  const loginAdmin = (password: string): boolean => {
    if (password.trim() === 'Bismillah99') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
        localStorage.setItem(STORAGE_KEY_AUTH, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch {
      // ignore
    }
  };

  // CRUD Operations
  const addProperty = (newPropData: Omit<Property, 'id'>): Property => {
    const newId = `prop-mlg-${Date.now()}`;
    const newProperty: Property = {
      ...newPropData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProperties(prev => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id: string, updated: Partial<Property>) => {
    setProperties(prev =>
      prev.map(p => {
        if (p.id === id) {
          return { ...p, ...updated };
        }
        return p;
      })
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const togglePropertySold = (id: string) => {
    setProperties(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextSoldState = !p.isSold;
          return {
            ...p,
            isSold: nextSoldState,
            badge: nextSoldState 
              ? 'SUDAH TERJUAL (SOLD)' 
              : (p.badge === 'SUDAH TERJUAL (SOLD)' ? 'UNIT TERSEDIA' : p.badge)
          };
        }
        return p;
      })
    );
  };

  const updateConsultant = (updated: Partial<ConsultantProfile>) => {
    setConsultant(prev => ({ ...prev, ...updated }));
  };

  const updateHomeConfig = (updated: Partial<HomeConfig>) => {
    setHomeConfig(prev => ({ ...prev, ...updated }));
  };

  const resetToDefaultData = () => {
    setProperties(INITIAL_PROPERTIES);
    setConsultant(CONSULTANT_INFO);
    setHomeConfig(INITIAL_HOME_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY_PROPERTIES);
      localStorage.removeItem(STORAGE_KEY_CONSULTANT);
      localStorage.removeItem(STORAGE_KEY_HOME);
    } catch {
      // ignore
    }
  };

  // Derived queries
  const soldProperties = useMemo(() => {
    return properties.filter(p => p.isSold === true);
  }, [properties]);

  const unsoldProperties = useMemo(() => {
    return properties.filter(p => !p.isSold);
  }, [properties]);

  const districtsList = useMemo(() => {
    const districtSet = new Set<string>();
    properties.forEach(p => {
      if (p.district) districtSet.add(p.district);
    });
    // Ensure standard Malang districts exist in list
    ['Lowokwaru', 'Klojen', 'Blimbing', 'Sukun', 'Kedungkandang', 'Batu / Malang Raya'].forEach(d => districtSet.add(d));
    return Array.from(districtSet);
  }, [properties]);

  const propertiesByDistrict = (district: string) => {
    if (!district || district === 'all') return properties;
    return properties.filter(p => p.district === district || p.location.toLowerCase().includes(district.toLowerCase()));
  };

  const totalAssetValue = useMemo(() => {
    return properties.reduce((acc, p) => acc + (p.price || 0), 0);
  }, [properties]);

  const totalSoldValue = useMemo(() => {
    return soldProperties.reduce((acc, p) => acc + (p.price || 0), 0);
  }, [soldProperties]);

  const totalActiveValue = useMemo(() => {
    return unsoldProperties.reduce((acc, p) => acc + (p.price || 0), 0);
  }, [unsoldProperties]);

  const value = {
    properties,
    consultant,
    homeConfig,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addProperty,
    updateProperty,
    deleteProperty,
    togglePropertySold,
    updateConsultant,
    updateHomeConfig,
    resetToDefaultData,
    soldProperties,
    unsoldProperties,
    propertiesByDistrict,
    districtsList,
    totalAssetValue,
    totalSoldValue,
    totalActiveValue
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
