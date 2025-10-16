import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KARNATAKA_DISTRICTS, normalizeDistrict } from '../../data/karnatakaDistricts';

const PlotForm = ({ onSubmit, initialData }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: initialData || {
      length: 50,
      width: 30,
      soil: 'loamy',
      rainfall: 600,
      trees: [],
      crops: [],
      district: '',
      waterSource: 'rainfed',
      formation: 'block',
      recommendCrops: false,
      numCrops: 2,
      numTrees: 1
    }
  });

  const selectedTrees = watch('trees') || [];
  const selectedCrops = watch('crops') || [];
  const district = watch('district');
  const recommendCrops = watch('recommendCrops');
  const formation = watch('formation');

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setValue('district', value);

    if (value.trim() === '') return;

    const normalized = normalizeDistrict(value);
    const districtData = KARNATAKA_DISTRICTS[normalized];

    if (districtData) {
      let soilOption = 'loamy';
      if (districtData.soil.includes('black')) soilOption = 'clay';
      else if (districtData.soil.includes('red')) soilOption = 'red';
      else if (districtData.soil.includes('laterite')) soilOption = 'sandy';

      setValue('soil', soilOption);
      setValue('rainfall', districtData.rainfall);
    }
  };

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  const districtOptions = Object.keys(KARNATAKA_DISTRICTS);

  return (
    <div style={{
      background: 'white',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#2d5016',
        fontSize: '20px',
        fontWeight: '600'
      }}>
        📐 {t('inputs.title')}
      </h3>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* District Input */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
            📍 {t('inputs.district.label')}
          </label>
          <input
            {...register('district')}
            onChange={handleDistrictChange}
            placeholder={t('inputs.district.placeholder')}
            list="districts"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              fontSize: '14px'
            }}
          />
          <datalist id="districts">
            {districtOptions.map(d => (
              <option key={d} value={d} />
            ))}
          </datalist>
          {district && KARNATAKA_DISTRICTS[normalizeDistrict(district)] && (
            <small style={{ color: '#2d5016', fontSize: '12px', display: 'block', marginTop: '6px' }}>
              ✅ {t('inputs.district.autoFilled')}: {KARNATAKA_DISTRICTS[normalizeDistrict(district)].rainfall}mm
            </small>
          )}
        </div>

        {/* Plot Dimensions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
              {t('inputs.length.label')}
            </label>
            <input
              {...register('length', { valueAsNumber: true, required: true, min: 10, max: 500 })}
              placeholder={t('inputs.length.placeholder')}
              type="number"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #d0d0d0',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
              {t('inputs.width.label')}
            </label>
            <input
              {...register('width', { valueAsNumber: true, required: true, min: 10, max: 500 })}
              placeholder={t('inputs.width.placeholder')}
              type="number"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #d0d0d0',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Soil Type */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
            {t('inputs.soil.label')}
          </label>
          <select
            {...register('soil', { required: true })}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="loamy">{t('inputs.soil.loamy')}</option>
            <option value="clay">{t('inputs.soil.clay')}</option>
            <option value="sandy">{t('inputs.soil.sandy')}</option>
            <option value="red">{t('inputs.soil.red')}</option>
          </select>
        </div>

        {/* Rainfall */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
            {t('inputs.rainfall.label')}
          </label>
          <input
            {...register('rainfall', { valueAsNumber: true, min: 200, max: 5000 })}
            placeholder={t('inputs.rainfall.placeholder')}
            type="number"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Water Source */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: '600',
            fontSize: '15px',
            color: '#2d5016'
          }}>
            💧 {t('inputs.waterSource.label')}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
            {[
              { value: 'rainfed', label: t('inputs.waterSource.rainfed') },
              { value: 'borewell', label: t('inputs.waterSource.borewell') },
              { value: 'pond', label: t('inputs.waterSource.pond') },
              { value: 'river', label: t('inputs.waterSource.river') }
            ].map(opt => (
              <label
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  background: watch('waterSource') === opt.value ? '#e8f5e9' : 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: watch('waterSource') === opt.value
                    ? '2px solid #2d5016'
                    : '1px solid #d0d0d0',
                  transition: 'all 0.2s ease',
                  fontSize: '14px'
                }}
              >
                <input
                  type="radio"
                  value={opt.value}
                  {...register('waterSource', { required: true })}
                  style={{
                    marginRight: '8px',
                    cursor: 'pointer',
                    width: '16px',
                    height: '16px'
                  }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Crop Recommendation Toggle */}
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            fontWeight: '600',
            fontSize: '15px',
            color: '#2d5016',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              {...register('recommendCrops')}
              style={{
                marginRight: '8px',
                cursor: 'pointer',
                width: '16px',
                height: '16px'
              }}
            />
            {t('Recommend Crops')}
          </label>
        </div>

        {/* Number of Crops to Grow */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '500',
            fontSize: '14px'
          }}>
            🌾 {t('inputs.numCrops.label')}
          </label>
          <input
            {...register('numCrops', { valueAsNumber: true, min: 0, max: 3 })}
            type="number"
            placeholder={t('inputs.numCrops.placeholder')}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Number of Trees to Grow */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '500',
            fontSize: '14px'
          }}>
            🌳 {t('inputs.numTrees.label')}
          </label>
          <input
            {...register('numTrees', { valueAsNumber: true, min: 0, max: 3 })}
            type="number"
            placeholder={t('inputs.numTrees.placeholder')}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Cropping Formation */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: '600',
            fontSize: '15px',
            color: '#2d5016'
          }}>
            🌱 {t('inputs.formation.label')}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            {[
              { value: 'block', label: t('inputs.formation.standard') },
              { value: 'intercropping', label: t('inputs.formation.intercropping') },
              { value: 'alley', label: t('inputs.formation.alley') }
            ].map(opt => (
              <label
                key={opt.value}
                style={{
                  display: 'block',
                  padding: '12px',
                  background: formation === opt.value ? '#e8f5e9' : 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: formation === opt.value
                    ? '2px solid #2d5016'
                    : '1px solid #d0d0d0',
                  transition: 'all 0.2s ease',
                  fontSize: '14px'
                }}
              >
                <input
                  type="radio"
                  value={opt.value}
                  {...register('formation', { required: true })}
                  style={{
                    marginRight: '8px',
                    cursor: 'pointer',
                    width: '16px',
                    height: '16px'
                  }}
                />
                <span style={{ fontWeight: '500' }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Trees Selection */}
        {!recommendCrops && (
          <div>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600',
              fontSize: '15px',
              color: '#2d5016'
            }}>
                🌳 {t('inputs.trees.label')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {t('inputs.trees.options', { returnObjects: true }).map(opt => (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    background: selectedTrees.includes(opt.value) ? '#e8f5e9' : 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: selectedTrees.includes(opt.value)
                      ? '2px solid #2d5016'
                      : '1px solid #d0d0d0',
                    transition: 'all 0.2s ease',
                    fontSize: '14px'
                  }}
                >
                  <input
                    type="checkbox"
                    value={opt.value}
                    {...register('trees')}
                    style={{
                      marginRight: '8px',
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            {selectedTrees.length > 0 && (
              <small style={{ color: '#666', marginTop: '6px', display: 'block', fontSize: '12px' }}>
                Selected: {selectedTrees.length} tree type(s)
              </small>
            )}
          </div>
        )}

        {/* Crops Selection */}
        {!recommendCrops && (
          <div>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600',
              fontSize: '15px',
              color: '#2d5016'
            }}>
              🌾 {t('inputs.crops.label')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {t('inputs.crops.options', { returnObjects: true }).map(opt => (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    background: selectedCrops.includes(opt.value) ? '#e8f5e9' : 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: selectedCrops.includes(opt.value)
                      ? '2px solid #2d5016'
                      : '1px solid #d0d0d0',
                    transition: 'all 0.2s ease',
                    fontSize: '14px'
                  }}
                >
                  <input
                    type="checkbox"
                    value={opt.value}
                    {...register('crops')}
                    style={{
                      marginRight: '8px',
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            {selectedCrops.length > 0 && (
              <small style={{ color: '#666', marginTop: '6px', display: 'block', fontSize: '12px' }}>
                Selected: {selectedCrops.length} crop type(s)
              </small>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit(onFormSubmit)}
          disabled={selectedTrees.length === 0 && selectedCrops.length === 0 && !recommendCrops}
          style={{
            padding: '14px',
            background: (selectedTrees.length > 0 || selectedCrops.length > 0 || recommendCrops)
              ? '#2d5016'
              : '#d0d0d0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: (selectedTrees.length > 0 || selectedCrops.length > 0 || recommendCrops)
              ? 'pointer'
              : 'not-allowed',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
        >
          {t('inputs.submit')}
        </button>

        {/* Validation Message */}
        {selectedTrees.length === 0 && selectedCrops.length === 0 && !recommendCrops && (
          <small style={{
            color: '#d32f2f',
            textAlign: 'center',
            fontSize: '13px'
          }}>
            ⚠️ {t('inputs.validation.select')}
          </small>
        )}
      </div>
    </div>
  );
};

export default PlotForm;