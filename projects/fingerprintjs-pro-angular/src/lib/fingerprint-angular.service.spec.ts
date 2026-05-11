import { TestBed } from '@angular/core/testing'

import { FingerprintAngularService } from './fingerprint-angular.service'
import { FingerprintAngularModule } from './fingerprint-angular.module'

import { Fingerprint } from '../public-api'
import { packageVersion } from './version'

const plainStartOptions = {
  apiKey: 'test_api_key',
}

const fullOptions: Fingerprint.StartOptions = {
  ...plainStartOptions,
  cache: {
    duration: 30,
    cachePrefix: 'test_cache_',
    storage: 'sessionStorage',
  },
  region: 'eu',
  endpoints: ['https://test/integration'],
  remoteControlDetection: true,
  storageKeyPrefix: 'test_storage_',
  urlHashing: {
    path: true,
    query: true,
    fragment: true,
  },
  integrationInfo: ['custom-angular/test'],
}

jest.mock('@fingerprint/agent', () => {
  return {
    ...(jest.requireActual('@fingerprint/agent') as any),
    start: jest.fn(() => {
      return {
        get: jest.fn(),
        collect: jest.fn(),
      }
    }),
    handleAgentData: jest.fn(),
    isFingerprintError: jest.fn(),
    withoutDefault: jest.fn(),
  }
})

describe('FingerprintAngularService', () => {
  let service: FingerprintAngularService
  let fingerprintAgent: any

  beforeEach(() => {
    fingerprintAgent = require('@fingerprint/agent')
    jest.clearAllMocks()
    TestBed.resetTestingModule()
  })

  it('should be created', () => {
    TestBed.configureTestingModule({
      imports: [FingerprintAngularModule.forRoot({ startOptions: fullOptions })],
    })
    service = TestBed.inject(FingerprintAngularService)
    expect(service).toBeTruthy()
  })

  it('should call Fingerprint.start with fullOptions', () => {
    TestBed.configureTestingModule({
      imports: [FingerprintAngularModule.forRoot({ startOptions: fullOptions })],
    })
    service = TestBed.inject(FingerprintAngularService)

    expect(fingerprintAgent.start).toHaveBeenCalledWith({
      ...fullOptions,
      integrationInfo: [...fullOptions.integrationInfo!, `angular/${packageVersion}`],
    })
  })

  it('should call Fingerprint.start with plainStartOptions', () => {
    TestBed.configureTestingModule({
      imports: [FingerprintAngularModule.forRoot({ startOptions: plainStartOptions })],
    })
    service = TestBed.inject(FingerprintAngularService)

    expect(fingerprintAgent.start).toHaveBeenCalledWith({
      ...plainStartOptions,
      integrationInfo: [`angular/${packageVersion}`],
    })
  })

  it('should call Fingerprint.start with correct parameters when integrationInfo is provided', () => {
    const optionsWithIntegration: Fingerprint.StartOptions = {
      ...fullOptions,
      integrationInfo: ['test-integration'],
    }
    TestBed.configureTestingModule({
      imports: [FingerprintAngularModule.forRoot({ startOptions: optionsWithIntegration })],
    })
    service = TestBed.inject(FingerprintAngularService)

    expect(fingerprintAgent.start).toHaveBeenCalledWith({
      ...optionsWithIntegration,
      integrationInfo: ['test-integration', `angular/${packageVersion}`],
    })
  })

  it('should call getVisitorData and call agent.get', async () => {
    TestBed.configureTestingModule({
      imports: [FingerprintAngularModule.forRoot({ startOptions: fullOptions })],
    })
    service = TestBed.inject(FingerprintAngularService)
    const getOptions: Fingerprint.GetOptions = {
      linkedId: 'test_linked_id',
    }
    const agent = (fingerprintAgent.start as jest.Mock).mock.results[0].value
    await service.getVisitorData(getOptions)
    expect(agent.get).toHaveBeenCalledWith(getOptions)
  })

  it('should call collectData and call agent.collect', async () => {
    TestBed.configureTestingModule({
      imports: [FingerprintAngularModule.forRoot({ startOptions: fullOptions })],
    })
    service = TestBed.inject(FingerprintAngularService)
    const collectOptions: Fingerprint.GetOptions = {
      tag: {
        user_id: '123',
      },
    }
    const agent = (fingerprintAgent.start as jest.Mock).mock.results[0].value
    await service.collectData(collectOptions)
    expect(agent.collect).toHaveBeenCalledWith(collectOptions)
  })

  it('should not throw error when calling clearCache in SSR environment', () => {
    const { PLATFORM_ID } = require('@angular/core')
    TestBed.configureTestingModule({
      imports: [FingerprintAngularModule.forRoot({ startOptions: fullOptions })],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })
    service = TestBed.inject(FingerprintAngularService)

    expect(() => service.clearCache()).not.toThrow()
  })
})
