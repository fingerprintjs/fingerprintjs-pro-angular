import { TestBed } from '@angular/core/testing'

import { FingerprintjsProAngularService } from './fingerprintjs-pro-angular.service'
import { FingerprintjsProAngularModule } from './fingerprintjs-pro-angular.module'
import { CacheLocation, FpjsClient, FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa'

import * as packageInfo from '../../package.json'

const testData = {
  visitorId: 'abcdef123456',
}

const loadOptions = {
  apiKey: 'test_api_key',
}

const fullOptions: FpjsClientOptions = {
  loadOptions,
  cacheLocation: CacheLocation.LocalStorage,
  cachePrefix: 'TEST_PREFIX',
  cacheTimeInSeconds: 60 * 15,
}

const init = jest.fn()
const getVisitorData = jest.fn()
//
jest.mock('@fingerprintjs/fingerprintjs-pro-spa', () => {
  return {
    ...(jest.requireActual('@fingerprintjs/fingerprintjs-pro-spa') as any),
    FpjsClient: jest.fn(() => {
      return {
        init,
        getVisitorData,
        clearCache: jest.fn(),
      }
    }),
  }
})

describe('FingerprintjsProAngularService', () => {
  let service: FingerprintjsProAngularService

  beforeEach(() => {
    init.mockClear()
    getVisitorData.mockClear()

    TestBed.configureTestingModule({
      imports: [FingerprintjsProAngularModule.forRoot({ loadOptions })],
    })

    service = TestBed.inject(FingerprintjsProAngularService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
    expect(init).toHaveBeenCalled()
  })

  it('should add integration info', () => {
    expect(FpjsClient).toHaveBeenCalledWith(
      expect.objectContaining({
        loadOptions: expect.objectContaining({
          ...loadOptions,
          integrationInfo: [`fingerprintjs-pro-angular/${packageInfo.version}`],
        }),
      })
    )
  })

  it('should call getVisitorData', async () => {
    expect(service).toBeTruthy()
    await service.getVisitorData()
    expect(getVisitorData).toHaveBeenCalled()
  })

  it('should call getVisitorData with params', async () => {
    getVisitorData.mockImplementation(() => testData)
    expect(service).toBeTruthy()
    const result = await service.getVisitorData()
    expect(getVisitorData).toHaveBeenCalled()
    expect(result).toEqual(testData)
  })
})

describe('FingerprintjsProAngularService with full params', () => {
  beforeEach(() => {
    init.mockClear()
    getVisitorData.mockClear()

    TestBed.configureTestingModule({
      imports: [FingerprintjsProAngularModule.forRoot(fullOptions)],
    })

    TestBed.inject(FingerprintjsProAngularService)
  })

  it('should add integration info', () => {
    expect(FpjsClient).toHaveBeenCalledWith(
      expect.objectContaining({
        loadOptions: expect.objectContaining({
          ...loadOptions,
          integrationInfo: [`fingerprintjs-pro-angular/${packageInfo.version}`],
        }),
        cacheLocation: CacheLocation.LocalStorage,
        cachePrefix: 'TEST_PREFIX',
        cacheTimeInSeconds: 60 * 15,
      })
    )
  })
})
